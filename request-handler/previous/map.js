// This file handles GET and POST requests for map related routes
import axios from 'axios';

const mapbox = require('mapbox');
const mapboxClient = new mapbox(process.env.MAPBOX_ACCESS_TOKEN);
console.log('Spotcrime key', process.env.SPOTCRIME_API_KEY);

module.exports = {
  GET: {
    // Retrieve geographical coordinates of requested address
    search: function getCoordinates(req) {
      const address = req.query.address;

      return mapboxClient.geocodeForward(address, (err) => {
        if (err) { console.log(err); }
      })
        .then((res) => {
          // Return closest search result
          console.log(res.entity.features[0]);
          return res.entity.features[0];
        });
    },
    crimes: function getCrimes(req) {
      return axios.get('http://api.spotcrime.com/crimes.json', {
        params: {
          lat: req.query.lat,
          lon: req.query.lon,
          key: process.env.SPOTCRIME_API_KEY,
          radius: 0.01,
        },
      })
        .then((res) => {
          // Map crimes into annotation objects
          const crimes = res.data.crimes.map(crime => ({
            coordinates: [crime.lat, crime.lon],
            type: 'point',
            title: crime.type,
            subtitle: `${crime.address} ${crime.date}`,
            annotationImage: {
              source: { uri: crime.type.toLowerCase() },
              height: 45,
              width: 45,
            },
            id: crime.cdid.toString(),
          }));
          // Return array of mapped crimes
          console.log(crimes);
          return crimes;
        });
    },
    directions: function getDirections(req) {
      // start and end coordinates are sent as parameters
      return axios.get(`https://api.mapbox.com/directions/v5/mapbox/walking/${req.query.start};${req.query.end}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&geometries=geojson`)
        .then(res => {
          // Return directions
          console.log(res.data.routes[0]);
          return res.data.routes[0];
        });
    }
  }
}
