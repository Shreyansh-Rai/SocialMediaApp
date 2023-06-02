import express from "express";
import {
    getUser, getUserFriends, addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js"; //tokenverification middleware

const router = express.Router();

router.get("/:id", verifyToken, getUser); //route params over here to get those variables from the url
router.get ("/:id/friends", verifyToken, getUserFriends);

/*handle request with db access

router.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Update user information based on the provided user ID
    // ...
    res.send('User updated successfully');
  });
A PATCH request is an HTTP method that is used to update or modify an existing resource partially. 
It is one of the standard HTTP methods, along with GET, POST, PUT, and DELETE, that can be used to 
interact with resources on the web.
The PATCH method is specifically designed for making partial modifications to a resource, meaning 
that only specific fields or properties of the resource are updated, while leaving the rest of the 
resource unchanged. This is in contrast to the PUT method, which is used to completely replace or 
overwrite a resource.
*/

router.patch("/:id/:friendId", verifyToken, addRemoveFriend); //I will just query in the controller if this friend
// is there I remove else add Skipping making seperate routes and controllers for all of that keeping it basic.

export default router;