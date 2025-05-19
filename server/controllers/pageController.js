import Link from "../models/Link.js";
import Page from "../models/Page.js";

export async function getPages(req,res){
    try{
        const pages = await Page.find({user: req.user.id})
        if(!pages){
            return res.status(404).json({message: "Error fetching user pages"})
        }
        return res.status(200).json({message: "Pages fetched successfully", pages})
    }
    catch(error){
        return res.status(500).json({message: "Error fetching pages", error})
    }
}

export async function getPage(req,res){
    try{
        const {id} = req.params
        const page = await Page.findOne({_id: id}).populate("links")
        if(!page){
            return res.status(404).json({message: "No pages found!"})
        }
        return res.status(200).json({message: "Page fetched successfully", page})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: "Error fetching page on server", error})
    }
}
export async function getPublicPage(req,res){
    try{
        const {slug} = req.params;
        const page = await Page.findOne({slug}).populate("links");
        if(!page){
            return res.status(404).json({message: "No pages found!"})
        }
        return res.status(200).json({message: "Page fetched successfully", page})
    }
    catch(error){
        return res.status(500).json({message: "Error fetching page on server", error})
    }
}

export async function createPage(req,res){
    try{
        const {title, description, slug, links,allowAnonymousMessages} = req.body;
        if(!slug || !Array.isArray(links)){
            return res.status(400).json({error: "Invalid input data!"})
        }
        const existingPage = await Page.findOne({slug})
        if(existingPage){
            return res.status(400).json({error: "Slug already in use"})
        }
        const userLinks = await Link.find({_id: {$in: links}, user: req.user.id})
        if(userLinks.length != links.length){
            return res.status(400).json({error: "some links are invalid and do not belong to the user"})
        }
        const newPage = new Page({
            title,
            slug,
            description,
            links,
            user: req.user.id,
            allowAnonymousMessages
        })
        await newPage.save();
        return res.status(200).json({message: "Page created successfully", newPage})
    }
    catch(error){
        return res.status(500).json({message: "Error creating page", error})
    }
}

export async function editPage(req,res){
    try{
    const {id, title, description, links, slug, allowAnonymousMessages} = req.body
    const userId = req.user.id;

    if(!title || !Array.isArray(links)){
        return res.status(400).json({message: "Invalid input data"})
    }
    const page = await Page.findById(id);
    if(!page){
        return res.status(400).json({error: "Page not find or you dont have permission to edit it"})
    }

    const userLinks = await Link.find({_id: {$in: links}, user: userId})
    if(userLinks.length != links.length){
        return res.status(400).json({error: "some links are invalid or do not belong to the user"})
    }

    page.title = title;
    page.description = description;
    page.links = links;
    page.allowAnonymousMessages = allowAnonymousMessages;

    if(page.slug != slug){
        const checkSlug = await Page.find({slug});
        if(!checkSlug){
            return res.status(404).json({error: "Slug already taken"});
        }
    }
    page.slug = slug;
    await page.save();
    return res.status(200).json({message: "Page successfully updated", page})
    }
    catch(error){
        return res.status(400).json({error: "Error editing page", error})
    }
}

export async function deletePage(req,res){
    try{
        const {id} = req.params;
        const userId = req.user.Id;
        const page = await Page.findByIdAndDelete(id);
        if(!page){
            return res.status(404).json({ error: "Page not found or you don't have permission to delete it." });
        }
        res.status(200).json({ message: "Page deleted successfully!" });
    }
    catch(error){
        return res.status(500).json({error: "error deleting page", error})
    }
}