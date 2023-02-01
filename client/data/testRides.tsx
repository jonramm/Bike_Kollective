const rides = [
    {
        'ride_id': '1234',
        'start_time': '2023-01-01 00:00:00', // Placeholder: Pretty sure firestore doesn't store timestamps this way
        'end_time': null,
        'rating': null,
        'bike': '1234',
        'rider': 'B8sQQBe93DXHvCdWKwPhVDLUFOH2', // switch out your uid for testing
        'location_start': {
            'latitude': 40.779867,
            'longitude': -77.815664
        },
        'location_end': {
            'latitude': null,
            'longitude': null
        },
    }
];

export { rides };