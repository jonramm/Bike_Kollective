interface LocationProps {
    latitude: number,
    longitude: number
}

interface Bike {
    bike_id: string,
    name: string,
    owner: string,
    photo: string,
    release: boolean,
    agg_rating: number,
    status: string,
    lock_combo: string,
    location: LocationProps,
    tags: [string]
}

const bikes = [
    {
        'bike_id': '1234',
        'name': 'Old Faithful',
        'owner': '1234',
        'photo': 'www.photo.com/old-faithful',
        'release': true,
        'agg_rating': 4.7,
        'lock_combo': '1234',
        'status': 'available',
        'location': {
            'latitude': 40.779867,
            'longitude': -77.815664
        },
        'tags': ['commuter', 'classic', '5-speed']
    },
    {
        'bike_id': '5678',
        'name': 'Adventure Awaits',
        'owner': '1234',
        'photo': 'www.photo.com/adventure-awaits',
        'release': true,
        'agg_rating': 5.0,
        'lock_combo': '5678',
        'status': 'available',
        'location': {
            'latitude': 40.773773,
            'longitude': -77.814162
        },
        'tags': ['gravel', 'tubeless', '16-speed']
    }
]

export { bikes };