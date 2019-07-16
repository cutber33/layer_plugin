/**
 * Created by johann on 08.07.19.
 */
"use strict";
var ShowLayer = (function() {
  function ShowLayer(url, map, timestamp) {
    //console.log(url, map, timestamp);
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(
        function(mbJson) {
          var jsonFile = mbJson;
          //Get the tiles
          var str2 = jsonFile["tiles"][0];
          var first = jsonFile["time"]["first"];
          var last = jsonFile["time"]["last"];
          var interval = jsonFile["time"]["interval"];
          var date = new Date(timestamp * 1000);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          if (month.toString().length < 2) {
            month = +("0" + month);
          }
          var day = date.getDate();
          if (day.toString().length < 2) {
            day = +("0" + day);
          }
          var hour = date.getHours();
          if (hour.toString().length < 2) {
            hour = +("0" + hour);
          }
          var minute = date.getMinutes();
          if (minute.toString().length < 2) {
            minute = +("0" + minute);
          }
          //Replace the date placeholders with the real date
          //console.log(urls[5]);
          //set Map Zoom Settings
          var minZoom = jsonFile["minzoom"];
          var maxZoom = jsonFile["maxzoom"];
          map.setZoom(minZoom);
          map.setMinZoom(minZoom);
          map.setMaxZoom(maxZoom);
          //set bounds
          var bounds = jsonFile["bounds"];
          var boundsSW = [bounds[0], bounds[1]];
          var boundsNE = [bounds[2], bounds[3]];
          var maxBounds = [boundsSW, boundsNE];
          map.setMaxBounds(maxBounds);
          var placeholders = [
            "{year}",
            "{month}",
            "{day}",
            "{hour}",
            "{minute}"
          ];
          var fillers = [year, month, day, hour, minute];
          var url2 = "",
            url3 = "",
            url4 = "",
            url5 = "",
            url6 = "";
          var urls = [str2, url2, url3, url4, url5, url6];
          console.log(typeof fillers);
          function loadTiles(filler, placeholder, urls) {
            for (var i = 0; i <= fillers.length; i++) {
              urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
            }
            console.log(urls[5]);
            map.addSource("sat-tiles", {
              type: "raster",
              tiles: [urls[5]],
              tileSize: 512
            });
            map.addLayer({
              id: "sat-tiles",
              type: "raster",
              source: "sat-tiles",
              minzoom: minZoom,
              maxzoom: maxZoom
            });
          }
          loadTiles(fillers, placeholders, urls);
          if (map.getLayer("sat-tiles")) {
            console.log(map.getLayer("sat-tiles"));
          } else {
            console.log("hoppla");
          }
        },
        function(reason) {
          console.log(reason);
        }
      );
  }
  return ShowLayer;
})();
export { ShowLayer };
