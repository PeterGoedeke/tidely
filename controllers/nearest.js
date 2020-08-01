function nearest(origin, points) {
    let bestSoFar = Infinity
    let bestLatLngSoFar = null

    points.forEach(point => {
        const distance = compareTwoPoints(origin, point)
        if(distance < bestSoFar) {
            bestSoFar = distance
            bestLatLngSoFar = point
        }
    })
    return bestLatLngSoFar
}

function compareTwoPoints(point1, point2) {
    return Math.pow(point1.lat - point2.lat, 2) + Math.pow(point1.lng - point2.lng, 2)
}

module.exports = nearest