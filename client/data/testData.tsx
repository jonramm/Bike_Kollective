const bikes = [
    {
        'bike_id': '1234',
        'name': 'Univega',
        'description': '70\'s 5-speed commuter with hybrid tires.',
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
        'name': 'Kona Rove',
        'description': 'Gravel adventure bike with tubeless tires.',
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
    },
    {
        'bike_id': '9123',
        'name': 'Dahon Uno',
        'description': 'Single speed fold-up with coaster brakes.',
        'owner': '1234',
        'photo': 'www.photo.com/in-the-fold',
        'release': true,
        'agg_rating': 4.5,
        'lock_combo': '9123',
        'status': 'available',
        'location': {
            'latitude': 47.643832,
            'longitude': -122.320228
        },
        'tags': ['fold-up', 'single-speed', 'commuter']
    }
]

export { bikes };