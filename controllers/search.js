const geocode = require('./geocode')
const tides = require('./tides')

async function search(req, res) {
    const latLng = await geocode(req.params.search)
    const tideInfo = await tides(latLng)
    return res.status(200).json(tideInfo)
}

module.exports = search