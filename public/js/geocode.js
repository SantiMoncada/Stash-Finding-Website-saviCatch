let geocoder;
const key = "AIzaSyAMzL3s__ul0jf_RCKdh2eRUwJJsQ5ojTo";
const url = "https://maps.googleapis.com/maps/api/geocode/json?";

document.getElementById('address').onkeyup = event => {
    const search = event.currentTarget.value;
    const request = url + "address=" + search + "&key=" + key;
    fetch(request)
        .then(response => response.json())
        .then(response => {
            const { lat, lng } = response.results[0].geometry.location;
            const latBox = document.getElementById('lat');
            const lonBox = document.getElementById('lon');
            latBox.value = lat;
            lonBox.value = lng;
        })
        .catch(err => console.log(err));

}
//https://maps.googleapis.com/maps/api/geocode/json?address=puerta%del%sol%madrid&key=AIzaSyAMzL3s__ul0jf_RCKdh2eRUwJJsQ5ojTo