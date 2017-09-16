import express from 'express';
import mapbox from 'mapbox';
import axios from 'axios';
import util from './../../util/utility';
// import {router, express} from './../api.js';


const router = express.Router();
const mapboxClient = new mapbox(process.env.MAPBOX_ACCESS_TOKEN);
const crimeSpot =  (input) => {
  return new Promise ((resolve, reject) => {
    axios.get('http://api.spotcrime.com/crimes.json',
      { params: {
          lat: input.lat,
          lon: input.lon,
          key: process.env.SPOTCRIME_API_KEY,
          radius: 0.01,
        },
      },
    )
      .then((result) => {
        // Map crimes into annotation objects
        console.log('what is the crime result', result);
        const crimes = result.data.crimes.map(crime => ({
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
        console.log('crimes', crimes);
        resolve(crimes);
      })
      .catch((err) => {
        console.log('line 52 error:', err);
        resolve(err);
      });
  });
};


// Address to coordinates
router.get('/geocode/forward', (req, res) => {
  const address = req.query.address;
  console.log('line 46 map.js server search evoked req.session env', req.session)
  mapboxClient.geocodeForward(address, (err) => {
    if (err) { console.log(err); }
  })
<<<<<<< 87773fd771a3d9bb206e100c05ca799489dec17f
    .then(result => {
      console.log('Search result', result.entity.features[0]);
      res.send(result.entity.features[0]);
    })
    .catch(err => res.status(404).send('Bad Request'));
});

// Coordinates to address
router.get('/geocode/reverse', (req, res) => {
  const location = {
    latitude: parseFloat(req.query.latitude),
    longitude: parseFloat(req.query.longitude)
  };
  mapboxClient.geocodeReverse(location, (err) => {
    if (err) { console.log(err) }
  })
    .then(result => {
      console.log('Reverse geocode result', result.entity.features[0]);
      res.send(result.entity.features[0]);
    })
    .catch(err => res.status(404).send('Bad Request'));
=======
    .then((result) => {
      console.log('Return search result', result.entity.features[0]);
      res.send(result.entity.features[0]);
    });
>>>>>>> ESlint files
});

router.get('/crimes', (req, res) => {
  console.log('hey');
  crimeSpot(req.query)
    .then((crimes) => {
      console.log(crimes);
      res.send(crimes);
    })
    .catch(err => res.status(404).send('Bad Request'));
});
<<<<<<< 87773fd771a3d9bb206e100c05ca799489dec17f

router.get('/directions', (req, res) => {
  axios.get(`https://api.mapbox.com/directions/v5/mapbox/walking/${req.query.start};${req.query.end}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&geometries=geojson`)
    .then(result => {
      console.log('Directions result', result.data.routes[0]);
      res.send(result.data.routes[0]);
    })
    .catch(err => res.status(404).send('Bad Request'));
});
=======
>>>>>>> ESlint files

module.exports = router;
