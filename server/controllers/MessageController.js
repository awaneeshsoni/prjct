import Message from "../models/Message.js";
import Page from "../models/Page.js";


export async function getMessages(req,res){
    try{
        const messages = await Message.find({user: req.user.id})
        .populate("page", "title slug")
        .sort({createdAt: -1})
        return res.status(200).json({messages})
        console.log(messages)
    }
    catch(error){
        return res.status(500).json({message: "Error fetching messages on server", error})
    }
}

export async function addMessage(req,res){
    try{
        const {message, slug} = req.body;
        const page = await Page.findOne({slug})
        if(!page){
            return res.status(404).json({message: "Erroe founding page on server"})
        }

        const addMessage = await Message.create({message: message, page: page._id, user: page.user._id })
        
        if(!addMessage){
            return res.status(201).json({messgae: "Error adding message"})
        }
        return res.status(200).json({message: "Message added successfully", addMessage})
    }
    catch(error){
        return res.status(500).json({message: "Error adding message", error})
    }

}

export async function deleteMessage(req,res){
    try{
        const message = await Message.findByIdAndDelete(req.params.id)
        if(!message){
            return res.status(201).json({message: "Error deleting message  on db"})
        }
        return res.status(200).json({message: "Message successfully deleted", message})
    }
    catch(error){
        return res.status(500).json({message: "Error deleting message on server ", error})
    }
}