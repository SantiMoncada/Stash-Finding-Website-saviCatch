


function init() {
    renderMap();
}

function renderMap() {
    const allCanvas = document.querySelectorAll('.thumbnailMap');
    allCanvas.forEach(canvas => {
        let singleMap;
        const center = { lat: parseFloat(canvas.dataset.lat), lng: parseFloat(canvas.dataset.lon) };
        console.log(center)
        singleMap = new google.maps.Map(
            canvas,
            {
                zoom: 16,
                center,
                disableDefaultUI: true,
                styles: mapStyle
            }
        )
        singleMap.setOptions({
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        });

    })

}