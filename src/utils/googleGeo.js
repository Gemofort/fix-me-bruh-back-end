const config = require('config');
const client = require('@google/maps').createClient({ Promise, key: config.get('google.apiKey') });

exports.reverseGeocode = async (lat, lng) => {
  const resp = await client.reverseGeocode({ latlng: [lat, lng] }).asPromise();
  if (!resp.json.results.length) return 'Emtpy location name';
  return resp.json.results[0].formatted_address;
};
