import { createSlice } from "@reduxjs/toolkit";
//To avoid state and properties from being passed around to and from various components we create a global state that
//we are able to access whenever we want to.
const initialState = {
    mode : "light", //theme
    user : null,
    token: null,
    posts:[],
};
/*
we will be using reducers to modify this initial state. Reducers: Reducers are pure functions that specify 
how the application state should change in response to an action. They take the current state and an action 
as input and return a new state object. Reducers should not modify the existing state but instead produce a 
new state based on the action.
*/
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      setLogin: (state, action) => { //actions are just JS objects that represent events or user interactions.
        state.user = action.payload.user;//set the user from backend when you login.
        state.token = action.payload.token; //token that is given is stored.
      },
      setLogout: (state) => {
        state.user = null; //return the user to null
        state.token = null;
      },
      setFriends: (state, action) => {
        if (state.user) { //to render the user's friends, convenient function to get the friends from backend and store here
          state.user.friends = action.payload.friends;
        } else {
          console.error("user friends non-existent :(");
        }
      },
      setPosts: (state, action) => {
        state.posts = action.payload.posts; //all the posts that the user should be seeing.
      },
      setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) return action.payload.post;
          return post;
        });
        state.posts = updatedPosts;
      },
    },
  });
  
  export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
    authSlice.actions;
  export default authSlice.reducer;