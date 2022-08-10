const tilesProvider = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

let myMap = L.map('myMap').setView([28.6400205, -106.0725591],15)

L.tileLayer(tilesProvider,{
    maxZoom: 22,
}).addTo(myMap)

//let marker = L.marker([28.6400205, -106.0725591]).addTo(myMap)

myMap.doubleClickZoom.disable()
myMap.on('dblclick', e => {
    let latLng = myMap.mouseEventToLatLng(e.originalEvent)
    L.marker([latLng.lat, latLng.lng]).addTo(myMap)
})


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const {coords} = pos
            L.marker([coords.latitude,coords.longitude]).addTo(myMap)

            L.Routing.control({
                waypoints: [
                    L.latLng(coords.latitude, coords.longitude),
                    L.latLng(28.630028840549418,-106.03471219539642)
                ],
                language: 'es'
            }).addTo(myMap)
    });
}else{
    L.marker([28.6400205, -106.0725591]).addTo(myMap)
}

