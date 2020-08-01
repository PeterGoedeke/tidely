const axios = require('axios')

async function tide({ lat, long }) {
    try {
        const response = await axios.get(process.env.NIWA_URL, {
            params: {
                apikey: process.env.NIWA_API_KEY,
                lat,
                long
            },
        })
        // retrieve the useful information from the api call and return
        const tidePoints = response.data.values
        return nextLowAndHigh(tidePoints.slice(0,2))
    }
    catch (err) {
        return err
    }
}

function nextLowAndHigh(nextTides) {
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

module.exports = tide