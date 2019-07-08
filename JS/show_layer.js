/**
 * Created by johann on 08.07.19.
 */
export class ShowLayer {
    constructor(url, map, timestamp) {
        //console.log(url, map, timestamp);
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (mbJson) {
                let jsonFile = mbJson;
                //Get the tiles
                let str2 = jsonFile["tiles"][0];

                let first = jsonFile["time"]["first"];
                let last = jsonFile["time"]["last"];
                let interval = jsonFile["time"]["interval"];


                    let date = new Date(timestamp*1000);
                    let year = date.getFullYear();

                    let month = date.getMonth() + 1;
                    if (month.toString().length < 2) {
                        month = "0" + month;
                    }

                    let day = date.getDate();
                    if (day.toString().length < 2) {
                        day = "0" + day;
                    }

                    let hour = date.getHours();
                    if (hour.toString().length < 2) {
                        hour = "0" + hour;
                    }

                    let minute = date.getMinutes();
                    if (minute.toString().length < 2) {
                        minute = "0" + minute;
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

                let placeholders = ["{year}", "{month}", "{day}", "{hour}", "{minute}"];
                let fillers = [year, month, day, hour, minute];
                let url2 = "", url3 = "", url4 = "", url5 = "", url6 = "";
                let urls = [str2, url2, url3, url4, url5, url6];

                function loadTiles(filler, placeholder, urls) {
                    for (let i = 0; i <= fillers.length; i++) {
                        urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
                    }
                    console.log(urls[5]);
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

                loadTiles(fillers, placeholders, urls);
                if (map.getLayer("sat-tiles")) {
                    console.log(map.getLayer("sat-tiles"));
                } else {
                    console.log("hoppla");
                }

            }, function (reason) {
                console.log(reason);
            });
    }
}
