import Post from "../models/Post.js"
import User from "../models/User.js"; 
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
      const post = await Post.find();//return all the posts in the DB
      //There are no reccs here just straight up all the posts.
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      const post = await Post.find({ userId }); //get the posts of that user.
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  /* UPDATE */
  export const commentPost = async (req,res) =>{
    try {
      const { id } = req.params;
      const { userId, comment } = req.body;
      const user = await User.findById(userId);
      const post = await Post.findById(id);
      // console.log(user);
      const fullname = `${user.firstName} ${user.lastName}`
      const fullcomment = `${fullname} : ${comment}`
      post.comments.push(fullcomment);
      // console.log(post.comments)
      //update that post's like params.
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { comments: post.comments },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  export const likePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await Post.findById(id);
      const isLiked = post.likes.get(userId);
      //if isLiked then remove from the map
      //else set that userId to true in the map.
      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
      //update that post's like params.
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };