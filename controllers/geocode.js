const axios = require('axios')

/**
 * Geocodes (takes a name and turns it into a latitude-longitude coordinate pair) a place name.
 * @param {String} searchTerm The placename to geocode
 */
async function geocode(searchTerm) {
    try {
        const response = await axios.get(process.env.GEOCODE_URL, {
            params: {
                apiKey: process.env.GEOCODE_API_KEY,
                searchText: searchTerm
            }
        })
        // if the user has entered an invalid search term, then return nothing
        if(response.data.Response.View.length == 0) {
            return null
        }
        // retrieve the useful information from the api call and return
        const latLongRaw = response.data.Response.View[0].Result[0].Location.DisplayPosition
        const latLong = {
            lat: latLongRaw.Latitude,
            long: latLongRaw.Longitude
        }
        return latLong
    }
    catch (err) {
        return err
    }
}

module.exports = geocode