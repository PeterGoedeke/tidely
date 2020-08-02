const geocode = require('./geocode')
const getWeather = require('./weather')
const typos = require('./typos')

/**
 * Search controller to handle requests made to the search url. Attempts to geocode the user's search term, get weather information about
 * the geocoded location, and then return it to the user.
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
async function search(req, res) {
    console.log(req.params.search)
    // make sure that they provided a search parameter
    if(!req.params.search) {
        return res.status(404).json({ message: 'No search term provided.' })
    }

    const latLng = await geocode(req.params.search)
    // if the geocoding was successful then we can proceed and send tide information to the user
    if(latLng) {
        const weatherInfo = await getWeather(latLng)
        return res.status(200).json({ placename: req.params.search, ...weatherInfo })
    }
    // otherwise, we send a 404 response with suggestions of possible typos
    const suggestions = typos(req.params.search)

    return res.status(404).json({ suggestions })
}

module.exports = search