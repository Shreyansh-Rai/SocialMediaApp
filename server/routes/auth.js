import express from "express";
import { login } from "../controllers/auth.js";
const router = express.Router(); //auth is prefixed on call to this comes from app.use(/auth...)

router.post('/login',login);

export default router;