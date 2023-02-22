import {Response as responseType} from "express";
import {db} from "../admin";

// define types
type entryType = {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    waiver: boolean,
    account_locked: boolean,
    bikes_owned: string[],
    bikes_checked_out: string[],
}

type requestType = {
    body: entryType,
    params: {user_id: string},
}

// fix type declarations
const getUser = async (request: requestType, response: responseType) => {
  await db.collection("users").doc(request.params.user_id).get()
      .then((user) => {
        console.log("Retrieved users");
        return response.status(200).json(user.data());
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

const getUsers = async (request: requestType, response: responseType) => {
  await db.collection("users").get()
      .then((data) => {
        const users: entryType[] = [];
        data.forEach((user) => {
          const single = {
            user_id: user.data().user_id,
            first_name: user.data().first_name,
            last_name: user.data().last_name,
            email: user.data().email,
            waiver: user.data().waiver,
            account_locked: user.data().account_locked,
            bikes_owned: user.data().bikes_owned,
            bikes_checked_out: user.data().bikes_checked_out,
          };
          users.push(single);
        });
        console.log("Retrieved users");
        return response.status(200).json(users);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

const createUser = async (request: requestType, response: responseType) => {
  const newUser = {
    user_id: request.body.user_id, // use user id from auth function
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    waiver: false, // allow account creation w/o signing waiver
    account_locked: false, // default to false upon creating new user
    bikes_owned: [], // default to empty array
    bikes_checked_out: [], // default to empty array
  };

  await db
      .collection("users")
      .doc(newUser.user_id)
      .set({
        user_id: newUser.user_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        waiver: newUser.waiver,
        account_locked: newUser.account_locked,
        bikes_owned: newUser.bikes_owned,
        bikes_checked_out: newUser.bikes_checked_out,
      })
      .then(() => {
        console.log("Created new user");
        return response.status(201).json({status: "Success", data: newUser});
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({error: "Can't create new user"});
      });
};

const patchUser = async (request: requestType, response: responseType) => {
  const entry = db.collection("users").doc(request.params.user_id);
  const currentUser = (await entry.get()).data() || {};
  // add new bikes to arrays
  const newBikesOwned = [
    ...new Set([
      ...currentUser.bikes_owned,
      ...request.body.bikes_owned,
    ]),
  ]; // union bikes owned
  const newBikesCheckedOut = [
    ...new Set([
      ...currentUser.bikes_checked_out,
      ...request.body.bikes_checked_out,
    ]),
  ];
  const newUser = {
    user_id: currentUser.user_id,
    first_name: request.body.first_name || currentUser.first_name,
    last_name: request.body.last_name || currentUser.last_name,
    email: request.body.email || currentUser.email,
    waiver: request.body.waiver || currentUser.waiver,
    account_locked: request.body.account_locked || currentUser.account_locked,
    bikes_owned: newBikesOwned,
    bikes_checked_out: newBikesCheckedOut,
  };

  await db
      .collection("users")
      .doc(newUser.user_id)
      .update({
        user_id: newUser.user_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        waiver: newUser.waiver,
        account_locked: newUser.account_locked,
        bikes_owned: newUser.bikes_owned,
        bikes_checked_out: newUser.bikes_checked_out,
      })
      .then(() => {
        console.log("Edited user");
        return response.status(201).json({status: "Success", data: newUser});
      })
      .catch((error) => {
        console.error(error);
        response.status(500).json({error: "Can't edit user"});
      });
};

export {
  getUser,
  getUsers,
  createUser,
  patchUser,
};
