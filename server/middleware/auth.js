import jwt from "jsonwebtoken";
//authentication to allow logged in users to hit different endpoints.
export const verifyToken = async (req,res,next) =>
{
    try {
        let token = req.header("Authorization"); //from the req from the front end grab token from key authorization
        if (!token) {
            return res.status (403).send("Access Denied");
        }
        if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft(); 
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET) ;
        req.user = verified;
        next();
        /*
            this next allows us to add this verifyToken function on a path or route and it will autmatically vet the token 
            that the frontend provides and then proceed to calling the next function on that route.
        */
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}