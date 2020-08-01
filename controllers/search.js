const geocode = require('./geocode')
const tides = require('./weather')
const typos = require('./typos')

async function search(req, res) {
    const latLng = await geocode(req.params.search)
    // if the geocoding was successful then we can proceed and send tide information to the user
    if(latLng) {
        const tideInfo = await tides(latLng)
        return res.status(200).json(tideInfo)
    }
    // otherwise, we send a 404 response with suggestions of possible typos
    const suggestions = typos(req.params.search)

    return res.status(404).json({ suggestions })

}

module.exports = search