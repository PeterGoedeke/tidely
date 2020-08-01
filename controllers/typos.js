const levenshtein = require('./levenshtein')

const nzBeaches = require('../front-end/src/assets/beaches/beaches.json')
nzBeaches.map(beach => beach.split(',')[0])

function typos(string) {
    let suggestions = []
    nzBeaches.forEach(beach => {
        if(levenshtein(string.toLocaleLowerCase(), beach.toLocaleLowerCase()) < 3) {
            suggestions.push(beach)
        }
    })
    return suggestions
}

module.exports = typos