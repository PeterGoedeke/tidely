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
        // retrieve the useful information from the api call and return
        return response.data.Response.View[0].Result[0].Location.DisplayPosition
    }
    catch (err) {
        return err
    }
}

module.exports = {
    geocode
}