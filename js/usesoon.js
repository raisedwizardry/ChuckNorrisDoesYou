

void function mapCourthouse(event) {
    for (var f = 0; f < fullCourtCodeAddress.length; f++)
        if (fullCourtCodeAddress[f] ===  event.target.id)
        {
            var latit = fullCourtCodeAddress[f].lat;
            var lngit = fullCourtCodeAddress[f].lng;
            console.log("lat: " + latit + " lng: " + lngit);
            L.CircleMarker([latit, lngit]).bindPopup(courtObject).addTo(map);
        }
}

function addACoor(courtObject) {
    var courta = document.createElement("a");
    var courtobj = courtObject.FullCourtCode;
    //courta.onclick= mapCourthouse(courtObject);
    courta.innerHTML = courtObject.FullCourtCode;
    courta.setAttribute('href', '#'); 
    courta.event =  function (e) { mapCourthouse(courtobj); };
    console.log(courta);
    return courta;
}

function addtoend() {
    var themap = mapGeocode("address", normAddress(obj));
    console.log(themap);
    var mapjson = doAjax(themap);
    console.log(mapjson);
    var lat = mapjson.responseJSON.results[0].geometry.location.lat;
    var lng = mapjson.responseJSON.results[0].geometry.location.lng;
    console.log("lat: " + lat + " lng: " + lng);
    var littleton = L.marker([lat, lng]).bindPopup(obj.MclaText).addTo(map);
}

function mapGeocode(prop, val) {
    let rooturl = "https://maps.googleapis.com/maps/api/geocode/json"
    let key = "&key=AIzaSyBB405h3Dxy-idGQPG4geuU_xfXrBuN_58"
    let base = createUrl(rooturl, prop, val)
    let url = base + key
    return url;
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


function toggleDone (event) {
    console.log(event.target)
  } 

  const characterList = document.querySelector('.characters')
  characterList.addEventListener('click', toggleDone)
