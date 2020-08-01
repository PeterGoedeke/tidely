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
async function getWind({ lat, long }) {
    try {
        const response = await axios.get(process.env.OPEN_WEATHER_MAP_URL, {
            params: {
                lat,
                lon: long,
                appid: process.env.OPEN_WEATHER_MAP_API_KEY
            },
        })
        // retrieve the useful information from the api call and return
        console.log(response)
        const tideInfo = response.data.values
        return tideInfo
    }
    catch (err) {
        console.log(err)
        return err
    }
}

;(async function() {
    const geocode = require('./geocode')
    console.log('hey')
    getWind(await geocode('orewa'))
})()

async function getWeather(latLng) {
    const todayTides = getTides(latLng, true)
    const weekPeaksTides = getTides(latLng)

    const response = await Promise.all([ todayTides, weekPeaksTides ])
    console.log(response)

    return {
        nextLowAndHigh: getNextLowAndHigh(response[1].slice(0,2)),
        todayTides: response[0],
        weekPeaksTides: response[1]
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

module.exports = getWeather