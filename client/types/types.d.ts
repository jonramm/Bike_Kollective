export type LocationProps = {
    latitude: number,
    longitude: number
}

export type BikeProp = {
    bike: Bike,
    userLocation: LocationProps
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

export type FirebaseImgProps = {
    width: string | number | undefined,
    height: string | number | undefined,
    borderRadius?: number,
    marginRight?: number,
    aspectRatio?: string | number | undefined,
}

export type SignInCredentials = {
    email: string,
    password: string
}

export type ProfileData = {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    waiver: boolean,
    account_locked: boolean,
    bikes_owned: string[],
    bikes_checked_out: string[],
  };

export type AuthContextType = {
    user?: any;
    setUser?: Dispatch<any>;
    userToken?: string;
    setUserToken?: Dispatch<any>;
    userProfile?: ProfileData;
    setUserProfile?: Dispatch<any>;
    userLocation?: LocationProps;
    setUserLocation?: Dispatch<any>;
    login?(email: string, password: string): void;
    register?(email: string, password: string): void;
    logout?(): void;
}