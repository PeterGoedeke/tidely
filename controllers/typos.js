const levenshtein = require('./levenshtein')

const nzBeaches = ['orewa', 'hatfields', 'mission bay']

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