const levenshtein = require('./levenshtein')
// react-app requires the beaches.json file and has a constraint as to its location
const nzBeaches = require('../front-end/src/assets/beaches/beaches.json')
// typo detection doesn't include region, so pre-process the array to remove regions
nzBeaches.map(beach => beach.split(',')[0])

/**
 * Typo detection function which is run on the query string if the geocoder is not able to find a location based on the query string.
 * @param {String} string The search parameter to check for typos
 */
function typos(string) {
    let suggestions = []
    nzBeaches.forEach(beach => {
        if(levenshtein(string.toLocaleLowerCase(), beach.toLocaleLowerCase()) < 3) {
            // build up a list of possible suggestions which could have been what the user was intending to search for
            suggestions.push(beach)
        }
    })
    return suggestions
}

module.exports = typos