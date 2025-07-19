import Message from "../models/Message.js";
import Page from "../models/Page.js";

export async function getMessages(req, res) {
    try {
        const messages = await Message.find({ user: req.user.id })
            .populate("page", "title slug")
            .sort({ createdAt: -1 })
        return res.status(200).json({ messages })
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching messages on server", error })
    }
}
export async function addMessage(req, res) {
    try {
        const { message, slug } = req.body;

        const page = await Page.findOne({ slug });
        if (!page) {
            return res.status(404).json({ message: "Error finding page on server" });
        }
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const userAgent = req.headers["user-agent"];

        const addMessage = await Message.create({
            message: message,
            page: page._id,
            user: page.user._id,
            ip,
            userAgent
        });

        if (!addMessage) {
            return res.status(500).json({ message: "Error adding message" });
        }

        page.messageCount = (page.messageCount || 0) + 1;
        page.messageLogs.push({ timestamp: new Date() });

        await page.save();

        return res.status(200).json({ message: "Message added successfully", addMessage });

    } catch (error) {
        return res.status(500).json({ message: "Error adding message", error });
    }
}

export async function deleteMessage(req, res) {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({ message: "Error deleting message from DB" });
        }

        const page = await Page.findById(message.page);
        if (page) {
            page.messageCount = Math.max((page.messageCount || 1) - 1, 0);

            if (page.messageLogs && page.messageLogs.length > 0) {
                page.messageLogs.pop();
            }

            await page.save();
        }

        return res.status(200).json({ message: "Message successfully deleted", message });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting message on server", error });
    }
}
