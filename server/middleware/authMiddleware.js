import jwt from "jsonwebtoken"


export async function authMiddleware(req, res, next){
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token){
        return res.status(401).json({error: "access denied "})
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next();
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error: "Error authenticating"}, error)
    }
}