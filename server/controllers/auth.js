import bcrypt from "bcrypt"; //encryption
import jwt from "jsonwebtoken"; 
import User from "../models/User.js"

/* REGISTER USER */ 
export const register = async (req, res) => { //call to database hence async
    try {
    const {
    firstName,
    lastName, 
    email, 
    password, 
    picturePath, 
    friends, 
    location, 
    occupation
    } = req.body;
    const salt = await bcrypt.genSalt(); //wait for bcrypt to generate salt for encryption
    const hashedpass = await bcrypt.hash(password,salt);

    const newUser = new User (
        {firstName,
        lastName, 
        email, 
        password : hashedpass , 
        picturePath, 
        friends, 
        location, 
        occupation,
        viewedProfile : Math. floor(Math. random() * 10000), 
        impressions: Math. floor(Math. random() * 10000) }
    );
    const savedUser = await newUser.save(); //just a mongo model save into db and send response to front end.
    res.status (201).json(savedUser)   
    } catch (err) {
        res.status(500).json({error: err.message });
    }
}

//login

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email : email}); // trying to find the one user that has the specified email.
        if (!user) return res.status(400).json({ msg: "User does not exist."});
        //https://stackoverflow.com/questions/40076638/compare-passwords-bcryptjs
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "invalid credentials."});

        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET); //user._id is auto generated in the database. hence the absence in the model.
        delete user.password;
        res.status(200). json({ token, user});
    }catch{
        res.status(500).json({error: err.message });
    }
}