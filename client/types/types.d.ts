export type LocationProps = {
    latitude: number,
    longitude: number
}

export type BikeProp = {
    bike: Bike
}

export type Bike = {
    bike_id: string,
    name: string,
    description: string,
    owner: string,
    photo: string,
    release: boolean,
    agg_rating: number,
    status: string,
    lock_combo: string,
    location: LocationProps,
    tags: string[]
}