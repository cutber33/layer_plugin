//const mapboxgl = require('mapbox-gl/src/index.js');
/*
mapboxgl.accessToken = 'pk.eyJ1IjoiY3V0YmVyMzMiLCJhIjoiY2p4Y3lmejM5MDBmYjN6b2N0dW5kemd0eCJ9.w0qOKr90XDitOx-JeQ829A';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: {
        "version": 8,
        "sources": {
            "raster-tiles": {
                "type": "raster",
                "tiles": ["https://maptiles.meteoblue.com/styles/terrain-en/{z}/{x}/{y}.png"],
                "tileSize": 256,
            },

        },
        "layers": [
            {
                "id": "simple-tiles",
                "type": "raster",
                "source": "raster-tiles",
                "minzoom": 0,
                "maxzoom": 22
            },
        ]
    },
    center: [10, 51], // starting position [lng, lat]
    zoom: 2, // starting zoom

});

*/

//var language = new MapboxLanguage();
//map.addControl(new mapboxgl.NavigationControl());

var picture = "https://static.meteoblue.com/pub/satellite/{year}{month}{day}/{hour}{minute}/{z}/{x}/{y}@2x.jpg";

var mbUrl = 'https://static.meteoblue.com/pub/satellite/SAT_COMPOSITE.json';


export class Layer {
    constructor(url, map) {
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (mbJson) {
                let jsonFile = mbJson;

                //Get the tiles
                let str2 = jsonFile["tiles"][0];


                //Get timestamps
                //let timestamps = [];
                let years = [];
                let months = [];
                let days = [];
                let hours = [];
                let minutes = [];

                let first = jsonFile["time"]["first"];
                let last = jsonFile["time"]["last"];
                let interval = jsonFile["time"]["interval"];

                for (var o = first; o <= last && (o-first)%interval==0; o=o+interval) {

                    var date = new Date(o*1000);
                    years.push(date.getFullYear());

                    var month = date.getMonth() + 1;
                    if (month.toString().length < 2) {
                        month = "0" + month;
                    }
                    months.push(month);

                    var day = date.getDate();
                    if (day.toString().length < 2) {
                        day = "0" + day;
                    }
                    days.push(day);

                    var hour = date.getHours();
                    if (hour.toString().length < 2) {
                        hour = "0" + hour;
                    }
                    hours.push(hour);

                    var minute = date.getMinutes();
                    if (minute.toString().length < 2) {
                        minute = "0" + minute;
                    }
                    minutes.push(minute);
                }

                //Replace the date placeholders with the real date

                //console.log(urls[5]);

                //set Map Zoom Settings
                let minZoom = jsonFile["minzoom"];
                let maxZoom = jsonFile["maxzoom"];

                map.setZoom(minZoom);
                map.setMinZoom(minZoom);
                map.setMaxZoom(maxZoom);

                //set bounds
                let bounds = jsonFile["bounds"];
                let boundsSW = [bounds[0], bounds[1]];
                let boundsNE = [bounds[2], bounds[3]];
                let maxBounds = [boundsSW,boundsNE];
                map.setMaxBounds(maxBounds);

                let currentImage = 0;

                function loadTiles(filler, placeholder, urls) {
                    for (let i = 0; i <= filler.length; i++) {
                        urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
                    }
                    map.addSource("sat-tiles", {
                        "type": "raster",
                        "tiles": [urls[5]],
                        "tileSize": 512,
                    });

                    map.addLayer({
                        "id": "sat-tiles",
                        "type": "raster",
                        "source": "sat-tiles",
                        "minzoom": minZoom,
                        "maxzoom": maxZoom,
                    });
                }

                function loadTiles2(filler, placeholder, urls) {
                    for (let i = 0; i <= filler.length; i++) {
                        urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
                    }

                    map.addSource("sat-tiles2", {
                        "type": "raster",
                        "tiles": [urls[5]],
                        "tileSize": 512,
                    });

                    map.addLayer({
                        "id": "sat-tiles2",
                        "type": "raster",
                        "source": "sat-tiles2",
                        "minzoom": minZoom,
                        "maxzoom": maxZoom,
                    });
                }

                setInterval(function () {

                    currentImage = (currentImage + 1) % years.length;

                    let placeholders = ["{year}", "{month}", "{day}", "{hour}", "{minute}"];
                    let fillers = [years[currentImage], months[currentImage], days[currentImage], hours[currentImage], minutes[currentImage]];
                    let nextFillers = [years[currentImage+1], months[currentImage+1], days[currentImage+1], hours[currentImage+1], minutes[currentImage+1]];
                    let url2 = "", url3 = "", url4 = "", url5 = "", url6 = "";
                    let urls = [str2, url2, url3, url4, url5, url6];


                    if (map.getLayer("sat-tiles")) {
                        if (map.getLayer("sat-tiles2")) {
                            map.moveLayer("sat-tiles2", "sat-tiles");
                            map.removeLayer("sat-tiles").removeSource("sat-tiles");
                            loadTiles(fillers, placeholders, urls);
                            map.moveLayer("sat-tiles", "sat-tiles2");
                            map.setLayoutProperty("sat-tiles2", 'visibility', 'none');
                            if (map.getLayer("sat-tiles") && map.getLayer("sat-tiles2")) {
                                map.removeLayer("sat-tiles2").removeSource("sat-tiles2");
                                loadTiles2(nextFillers, placeholders, urls);
                            } else {
                                loadTiles2(nextFillers,placeholders,urls);
                            }
                        } else {
                            loadTiles2(nextFillers, placeholders, urls);
                        }
                    } else {
                       loadTiles(fillers, placeholders, urls);
                       loadTiles2(nextFillers, placeholders, urls);
                    }



                }, 1000);


                return url5;
            }, function (reason) {
                console.log(reason);
            });
    }
}
//getJson(mbUrl);