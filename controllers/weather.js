const axios = require('axios')

/**
 * Function which fetches tide information for a given location from the NIWA API. Gives detailed tide information for the current day, general information about the current week, and specifies exactly when the next low tide and the next high tide are
 * @param {Object} latLng An object containing the latitude and longitude to get the weather for
 */
async function getTides({ lat, long }) {
    try {
        // the url and the general parameters to request for data
        const url = process.env.NIWA_URL
        const parameters = {
            apikey: process.env.NIWA_API_KEY,
            lat, long
        }
        // simultaneously make the call for the weekly and current day tide information
        const [weekTides, todayTides] = (await Promise.all([
            axios.get(url, { params: parameters }),

            axios.get(url, {
                params: {
                    ...parameters,
                    interval: 10,
                    numberOfDays: 1
                }
            })
        ])).map(tides => tides.data.values) // required information is deeply nested, so extract it

        const nextLowAndHighTide = getNextLowAndHighTide(todayTides)
        return {
            week: weekTides,
            today: todayTides,
            nextPeaks: nextLowAndHighTide
        }
    }
    catch (err) {
        return err
    }
}

/**
 * Get the next low and high tide given the next tide peaks starting from any point in the tide cycle
 * @param {Object} nextTides Result from the getTides api call
 */
function getNextLowAndHighTide(nextTides) {
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

/**
 * Function to retrieve the wind speed, direction, and a description of the current weather from the open weather map API.
 * @param {Object} latLng An object containing the latitude and longitude to get the weather for
 */
async function getEnvironmentWeather({ lat, long }) {
    try {
        const response = await axios.get(process.env.OPEN_WEATHER_MAP_URL, {
            params: {
                lat, lon: long,
                appid: process.env.OPEN_WEATHER_MAP_API_KEY
            }
        })
        // retrieve the useful information from the api call and return
        const environmentInfo = {
            weatherCategory: response.data.weather[0].main,
            weatherDescription: response.data.weather[0].description,
            wind: response.data.wind
        }
        return environmentInfo
    }
    catch (err) {
        console.log(err)
        return err
    }
}

/**
 * Function which gets all available weather properties for a given location
 * @param {Object} latLng An object containing the latitude and longitude to get the weather for
 */
async function getWeather(latLng) {
    const tideInfo = getTides(latLng)
    const environmentInfo = getEnvironmentWeather(latLng)

    const [tide, env] = await Promise.all([ tideInfo, environmentInfo ])

    return { tide, env }
}

module.exports = getWeather