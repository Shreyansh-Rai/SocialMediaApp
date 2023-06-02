import User from "../models/User.js";


export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch (err) {
    res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try{
        const id = req.params.id; //TODO: check if it works
        const user = await User.findById(id);
        const friends = await Promise.all(
        user.friends.map((id)=>User.findById(id))
        );
    //user.friends is a JS array basically with the user's friends and we just create a map from their ids to their user objects
    //the map takes in the ids in the friend vector and then maps it using User.findById()
    /*
        Promise.all() is a method that takes an iterable (such as an array) of Promises and returns a new Promise. 
        This new Promise is fulfilled when all the Promises in the iterable are fulfilled, and it provides an array 
        of their resolved values in the same order. If any of the Promises in the iterable is rejected, the resulting 
        Promise returned by Promise.all() is immediately rejected. Which is what we are doing over here as well : 
        async function fetchData() {
            const promise1 = fetchDataFromSource1();
            const promise2 = fetchDataFromSource2();
            const promise3 = fetchDataFromSource3();
            //equivalent to this map here that essentially has an array of db access functions:user.friends.map((id)=>User.findById(id))
            try {
                const [data1, data2, data3] = await Promise.all([promise1, promise2, promise3]);
                // Process the data...
            } catch (error) {
                // Handle the error...
            }
        }

    */
        const formattedFriends = friends. map(({_id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    }catch (err)
    {
        res.status(404).json({ message: err.message });
    }
}   

export const addRemoveFriend = async (req, res) => {
    try{
        const{id,friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if(user.friends.includes(friendId)) //if found remove
        {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id!==id);
        }
        else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends = friends.map(({_id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
        );
        res.status(200).json(formattedFriends);
    }catch(err)
    {
        res.status(404).json({message: err.message})
    }

}