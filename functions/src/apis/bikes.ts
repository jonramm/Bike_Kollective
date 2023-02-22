import {Response as responseType} from "express";
import {v4 as uuidv4} from "uuid";
import {db} from "../admin";

// define types
type location = {
  latitude: number,
  longitude: number,
}

type entryType = {
    bike_id: string,
    name: string,
    description: string,
    owner: string,
    photo: string,
    release: boolean,
    num_ratings: number,
    agg_rating: number,
    status: string,
    lock_combo: string,
    location: location
    tags: string[],
}

type requestType = {
    body: entryType,
    params: {bike_id: string},
}

const createBike = async (request: requestType, response: responseType) => {
  const newBike = {
    bike_id: uuidv4(),
    name: request.body.name,
    description: request.body.description,
    owner: request.body.owner,
    photo: request.body.photo,
    release: false,
    num_ratings: request.body.num_ratings,
    agg_rating: request.body.agg_rating,
    status: request.body.status,
    lock_combo: request.body.lock_combo,
    location: request.body.location,
    tags: request.body.tags,
  };

  await db
      .collection("bikes")
      .doc(newBike.bike_id)
      .set({
        bike_id: newBike.bike_id,
        name: newBike.name,
        description: newBike.description,
        owner: newBike.owner,
        photo: newBike.photo,
        release: newBike.release,
        num_ratings: newBike.num_ratings,
        agg_rating: newBike.agg_rating,
        status: newBike.status,
        lock_combo: newBike.lock_combo,
        location: newBike.location,
        tags: newBike.tags,
      })
      .then(() => {
        console.log("Created new bike");
        return response.status(201).json({status: "Success", data: newBike});
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({error: "Can't create new bike"});
      });
};

const getBike = async (request: requestType, response: responseType) => {
  await db.collection("bikes").doc(request.params.bike_id).get()
      .then((bike) => {
        console.log("Retrieved bike");
        return response.status(200).json(bike.data());
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

const getBikes = async (request: requestType, response: responseType) => {
  await db.collection("bikes").get()
      .then((data) => {
        const bikes: entryType[] = [];
        data.forEach((bike) => {
          const single = {
            bike_id: bike.data().bike_id,
            name: bike.data().name,
            description: bike.data().description,
            owner: bike.data().owner,
            photo: bike.data().photo,
            release: bike.data().release,
            num_ratings: bike.data().num_ratings,
            agg_rating: bike.data().agg_rating,
            status: bike.data().status,
            lock_combo: bike.data().lock_combo,
            location: bike.data().location,
            tags: bike.data().tags,
          };
          bikes.push(single);
        });
        console.log("Retrieved bikes");
        return response.status(200).json(bikes);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

const patchBike = async (request: requestType, response: responseType) => {
  const entry = db.collection("bikes").doc(request.params.bike_id);
  const currentBike = (await entry.get()).data() || {};
  var newTags = [...new Set([...currentBike.tags, ...request.body.tags])];    // TODO - update so that tags are not required in request.body

  const newBike = {
    bike_id: currentBike.bike_id,
    name: request.body.name || currentBike.name,
    description: request.body.description || currentBike.description,
    owner: request.body.owner || currentBike.owner,
    photo: request.body.photo || currentBike.photo,
    release: request.body.release || currentBike.release,
    num_ratings: request.body.num_ratings || currentBike.num_ratings,
    agg_rating: request.body.agg_rating || currentBike.agg_rating,
    status: request.body.status || currentBike.status,
    lock_combo: request.body.lock_combo || currentBike.lock_combo,
    location: request.body.location || currentBike.location,
    tags: newTags
  };

  await db
      .collection("bikes")
      .doc(newBike.bike_id)
      .update({
        bike_id: newBike.bike_id,
        name: newBike.name,
        description: newBike.description,
        owner: newBike.owner,
        photo: newBike.photo,
        release: newBike.release,
        num_ratings: newBike.num_ratings,
        agg_rating: newBike.agg_rating,
        status: newBike.status,
        lock_combo: newBike.lock_combo,
        location: newBike.location,
        tags: newBike.tags,
      })
      .then(() => {
        console.log("Edited bike");
        return response.status(201).json({status: "Success", data: newBike});
      })
      .catch((error) => {
        console.error(error);
        response.status(500).json({error: "Can't edit bike"});
      });
};

export {
  getBike,
  getBikes,
  createBike,
  patchBike,
};
