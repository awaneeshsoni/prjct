import mongoose from "mongoose";
import Link from "../models/Link.js";

export async function createLink(req, res) {
    let { title, url } = req.body;
    try {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        const link = await Link.create({ title, url, user: req.user.id });
        return res
            .status(200)
            .json({ message: "Link created successfully!", link })
    }
    catch (error) {
        return res.status(201).json({ message: "error creating link", error })
    }
}

export async function getLinks(req, res) {
    const userId = req.user.id;
    try {
        const links = await Link.find({ user: userId });
        return res.status(200).json({ message: "Links fetched successully!", links })
    }
    catch (error) {
        return res.status(201).json({ message: "erroe fecthing links on server", error })


    }

}

export async function getLink(req, res) {
    const { id } = req.params;
    try {
        const link = await Link.findOne({ _id: id })
        if (!link) {
            return res.status(201).json({ message: "Link not found!" })
        }
        return res.status(200).json({ message: "Link fetched successfully!", link })
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching link", error })
    }
}

export async function editLink(req, res) {
    let { title, url } = req.body;
    const { id } = req.params;

    try {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        const link = await Link.findOneAndUpdate(
            { _id: id },
            { title, url },
            { new: true }
        );

        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        return res.status(200).json({ message: "Link updated successfully!", link });
    } catch (error) {
        console.error("Error updating link:", error);
        return res.status(500).json({ message: "Error updating link", error: error.message });
    }
}
export async function deleteLink(req, res) {
    const { id } = req.params
    try {
        const result = await Link.findOneAndDelete({ _id: id });
        return res.status(200).json({ message: "Link deleted successfully", result })
    }
    catch (error) {
        return res.status(500).json({ messgae: "Error deleting link", error })
    }
}

export async function trackLinkClick(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid link ID" });
    }

    try {
        const updatedLink = await Link.findByIdAndUpdate(
            id,
            {
                $inc: { clicks: 1 },
                $push: {
                    clickLogs: {
                        timestamp: new Date(),
                        ip: req.ip,
                        userAgent: req.headers["user-agent"],
                    },
                },
            },
            {
                new: true,      // return the updated doc
                upsert: false,  // set to true if you want to create if not exists
            }
        );

        if (!updatedLink) {
            return res.status(404).json({ message: "Link not found!" });
        }

        return res.redirect(updatedLink.url); // redirect to original URL
    } catch (error) {
        console.error("Error tracking link click:", error);
        return res.status(500).json({ message: "Error tracking link click", error });
    }
}