import {Response as responseType} from "express";
import {v4 as uuidv4} from "uuid";
import {db} from "../admin";
import {Timestamp} from "firebase-admin/firestore";

// define types
type location = {
  latitude: number,
  longitude: number,
}

type entryType = {
    ride_id: string,
    start_time: number,
    end_time: number,
    rating: number,
    bike: string,
    rider: string,
    location_start: location,
    location_end: location,
}

type requestType = {
    body: entryType,
    params: {ride_id: string},
}

const createRide = async (request: requestType, response: responseType) => {
  const newRide = {
    ride_id: uuidv4(),
    start_time: Timestamp.now(),
    end_time: null,
    rating: null,
    bike: request.body.bike,
    rider: request.body.rider,
    location_start: request.body.location_start,
    location_end: null,
  };

  await db
      .collection("rides")
      .doc(newRide.ride_id)
      .set({
        ride_id: newRide.ride_id,
        start_time: newRide.start_time,
        end_time: newRide.end_time,
        rating: newRide.rating,
        bike: newRide.bike,
        rider: newRide.rider,
        location_start: newRide.location_start,
        location_end: newRide.location_end,
      })
      .then(() => {
        console.log("Created new ride");
        return response.status(201).json({status: "Success", data: newRide});
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({error: "Can't create new ride"});
      });
};

const getRide = async (request: requestType, response: responseType) => {
  await db.collection("rides").doc(request.params.ride_id).get()
      .then((ride) => {
        console.log("Retrieved ride");
        return response.status(200).json(ride.data());
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

const getRides = async (request: requestType, response: responseType) => {
  await db.collection("rides").get()
      .then((data) => {
        const rides: entryType[] = [];
        data.forEach((ride) => {
          const single = {
            ride_id: ride.data().ride_id,
            start_time: ride.data().start_time,
            end_time: ride.data().end_time,
            rating: ride.data().rating,
            bike: ride.data().bike,
            rider: ride.data().rider,
            location_start: ride.data().location_start,
            location_end: ride.data().location_end,
          };
          rides.push(single);
        });
        console.log("Retrieved rides");
        return response.status(200).json(rides);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
      });
};

const patchRide = async (request: requestType, response: responseType) => {
  const entry = db.collection("rides").doc(request.params.ride_id);
  const currentRide = (await entry.get()).data() || {};
  const endTime = request.body.end_time ? Timestamp.now():currentRide.end_time;
  const newRide = {
    ride_id: currentRide.ride_id,
    start_time: request.body.start_time || currentRide.start_time,
    end_time: endTime,
    rating: request.body.rating || currentRide.rating,
    bike: request.body.bike || currentRide.bike,
    rider: request.body.rider || currentRide.rider,
    location_start: request.body.location_start || currentRide.location_start,
    location_end: request.body.location_end || currentRide.location_end,
  };

  await db
      .collection("rides")
      .doc(newRide.ride_id)
      .update({
        ride_id: newRide.ride_id,
        start_time: newRide.start_time,
        end_time: newRide.end_time,
        rating: newRide.rating,
        bike: newRide.bike,
        rider: newRide.rider,
        location_start: newRide.location_start,
        location_end: newRide.location_end,
      })
      .then(() => {
        console.log("Edited ride");
        return response.status(201).json({status: "Success", data: newRide});
      })
      .catch((error) => {
        console.error(error);
        response.status(500).json({error: "Can't edit ride"});
      });
};

export {
  getRide,
  getRides,
  createRide,
  patchRide,
};
