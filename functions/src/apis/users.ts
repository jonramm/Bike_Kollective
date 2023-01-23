import {db} from "../admin";

// fix type declarations
const createUser = async (request: any, response: any) => {
  const newUser = {
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    user_id: request.body.user_id,
  };

  await db
      .collection("users")
      .doc(newUser.user_id)
      .set({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        user_id: newUser.user_id,
      })
      .then((doc: any)=>{
        console.log("Created new user");
        return response.status(201).json({result: doc});
      })
      .catch((error: any) => {
        console.error(error);
        return response.status(500).json({error: "Can't create new user"});
      });
};

export {
  createUser,
};
