import {createCheckout, lemonSqueezySetup} from "@lemonsqueezy/lemonsqueezy.js"

export async function Checkout(req, res){
  const { variantId, userId, email } = req.body;

  const apiKey = process.env.LEMON_API_KEY;
  if (!apiKey) {
    console.error("LEMONSQUEEZY_API_KEY is not set in your .env file!");
    return res.status(500).json({ error: "API Key is not configured." });
  }
  lemonSqueezySetup({ apiKey });
  const storeId = process.env.LEMON_STORE_ID;
  if (!storeId || !variantId) {
    return res.status(400).json({ error: 'Missing Store ID or Variant ID.' });
  }
  try {
    const checkout = await createCheckout(storeId, variantId, {
      checkoutData: {
        email: email,
        custom: { userId: userId },
      },
      productOptions: {
        redirectUrl: `${process.env.APP_URL}/dashboard`,
      },
      checkoutOptions: {
        dark: true,
      }
    });
    if (checkout.error) {
      throw new Error(JSON.stringify(checkout.error));
    }
    const checkoutUrl = checkout.data.data.attributes.url;
    res.json({ url: checkoutUrl });

  } catch (err) {
    console.error('Error from Lemon Squeezy SDK:', err.message);
    res.status(500).json({ error: 'Failed to create checkout via SDK.', details: err.message });
  }
}

const plans = {
    "574871": "pro",
    "576491": "business"
};

export async function Webhook(req, res){
    const secret = process.env.LEMON_WEBHOOK_SECRET;
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(req.body).digest('hex'), 'utf8');
    const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');

    if (!crypto.timingSafeEqual(digest, signature)) {
        throw new Error('Invalid signature.');
    }

    try {
        const parsedBody = JSON.parse(req.body.toString("utf8"));
        const { meta, data } = parsedBody
        const userId = meta.custom_data.user_id ;
        const event = meta.event_name;
        const productId = data.attributes.product_id;
        const subscriptionId = data.id;
        const customerId = data.attributes.customer_id;
        const plan = plans[productId] || "free";

        if (["subscription_created", "subscription_updated"].includes(event)) {
            await User.findByIdAndUpdate(
                 userId ,
                {
                    plan,
                    productId,
                    lemonsqueezyCustomerId: customerId,
                    lemonsqueezySubscriptionId: subscriptionId,
                    subscriptionStatus: data.attributes.status,
                    subscriptionRenewsAt: data.attributes.renews_at,
                    subscriptionEndsAt: data.attributes.ends_at,
                },
                { upsert: true }
            );
            console.log("plan updated in mongo")
        }

        if (["subscription_cancelled", "subscription_expired"].includes(event)) {
            await User.findByIdAndUpdate(
                 userId ,
                {
                    plan: "free",
                    lemonsqueezySubscriptionId: null,
                }
            );
        }
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Webhook Error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

