const axios = require('axios')

async function getTides({ lat, long }, today = false) {
    try {
        const response = await axios.get(process.env.NIWA_URL, {
            params: {
                apikey: process.env.NIWA_API_KEY,
                lat,
                long,
                interval: today ? 10 : undefined,
                numberOfDays: today ? 1 : undefined
            },
        })
        // retrieve the useful information from the api call and return
        const tideInfo = response.data.values
        return tideInfo
    }
    catch (err) {
        return err
    }
}

async function tides(latLng) {
    const today = getTides(latLng, true)
    const weekPeaks = getTides(latLng)

    const response = await Promise.all([ today, weekPeaks ])

    return {
        nextLowAndHigh: getNextLowAndHigh(response[1].slice(0,2)),
        today: response[0],
        weekPeaks: response[1]
    }
}

function getNextLowAndHigh(nextTides) {
    let low, high = null
    if(nextTides[0].value > nextTides[1].value) {
        low = nextTides[1]
        high = nextTides[0]
    }
    else {
        low = nextTides[0]
        high = nextTides[1]
    }
    return { low, high }
}

module.exports = tides