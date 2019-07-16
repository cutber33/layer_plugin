"use strict";
var Layer = (function() {
  function Layer(url, map) {
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(
        function(mbJson) {
          var jsonFile = mbJson;
          //Get the tiles
          var str2 = jsonFile["tiles"][0];
          var years = [];
          var months = [];
          var days = [];
          var hours = [];
          var minutes = [];
          var first = jsonFile["time"]["first"];
          var last = jsonFile["time"]["last"];
          var interval = jsonFile["time"]["interval"];
          for (
            var o = first;
            o <= last && (o - first) % interval == 0;
            o = o + interval
          ) {
            var date = new Date(o * 1000);
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
          var currentImage = 0;
          function loadTiles(filler, placeholder, urls) {
            for (var i = 0; i <= filler.length; i++) {
              urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
            }
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
          function loadTiles2(filler, placeholder, urls) {
            for (var i = 0; i <= filler.length; i++) {
              urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
            }
            map.addSource("sat-tiles2", {
              type: "raster",
              tiles: [urls[5]],
              tileSize: 512
            });
            map.addLayer({
              id: "sat-tiles2",
              type: "raster",
              source: "sat-tiles2",
              minzoom: minZoom,
              maxzoom: maxZoom
            });
          }
          function loadTiles3(filler, placeholder, urls) {
            for (var i = 0; i <= filler.length; i++) {
              urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
            }
            map.addSource("sat-tiles3", {
              type: "raster",
              tiles: [urls[5]],
              tileSize: 512
            });
            map.addLayer({
              id: "sat-tiles3",
              type: "raster",
              source: "sat-tiles3",
              minzoom: minZoom,
              maxzoom: maxZoom
            });
          }
          setInterval(function() {
            currentImage = (currentImage + 1) % years.length;
            var placeholders = [
              "{year}",
              "{month}",
              "{day}",
              "{hour}",
              "{minute}"
            ];
            var fillers = [
              years[currentImage],
              months[currentImage],
              days[currentImage],
              hours[currentImage],
              minutes[currentImage]
            ];
            var fillers2 = [
              years[currentImage + 1],
              months[currentImage + 1],
              days[currentImage + 1],
              hours[currentImage + 1],
              minutes[currentImage + 1]
            ];
            var fillers3 = [
              years[currentImage + 2],
              months[currentImage + 2],
              days[currentImage + 2],
              hours[currentImage + 2],
              minutes[currentImage + 2]
            ];
            var url2 = "",
              url3 = "",
              url4 = "",
              url5 = "",
              url6 = "";
            var urls = [str2, url2, url3, url4, url5, url6];
            if (map.getLayer("sat-tiles")) {
              console.log("1");
              if (map.getLayer("sat-tiles2") && map.getLayer("sat-tiles3")) {
                console.log(2);
                map.removeLayer("sat-tiles").removeSource("sat-tiles");
              } else if (!map.getLayer("sat-tiles2")) {
                console.log(3);
                loadTiles2(fillers2, placeholders, urls);
                map.removeLayer("sat-tiles3").removeSource("sat-tiles3");
              } else {
                console.log(4);
                loadTiles3(fillers2, placeholders, urls);
              }
            } else {
              if (map.getLayer("sat-tiles2") && map.getLayer("sat-tiles3")) {
                console.log(5);
                loadTiles(fillers2, placeholders, urls);
                map.removeLayer("sat-tiles2").removeSource("sat-tiles2");
              } else {
                console.log(6);
                loadTiles(fillers, placeholders, urls);
                loadTiles2(fillers2, placeholders, urls);
                loadTiles3(fillers3, placeholders, urls);
              }
            }
            /*
                if (map.getLayer("sat-tiles")) {
                    if (map.getLayer("sat-tiles2")) {
                        map.on('style.load', function () {
                            map.moveLayer("sat-tiles2", "sat-tiles");
                            console.log("true3");

                        });
                            map.removeLayer("sat-tiles").removeSource("sat-tiles");
                            loadTiles(fillers, placeholders, urls);
                        map.on('style.load', function () {
                            map.moveLayer("sat-tiles", "sat-tiles2");
                            console.log("true3");

                        });
                        //map.setLayoutProperty("sat-tiles2", 'visibility', 'none');
                            map.removeLayer("sat-tiles2").removeSource("sat-tiles2");
                            loadTiles2(nextFillers, placeholders, urls);
                    } else {
                        loadTiles2(nextFillers, placeholders, urls);
                    }
                } else {
                   loadTiles(fillers, placeholders, urls);
                   loadTiles2(nextFillers, placeholders, urls);
                }
                */
          }, 1000);
        },
        function(reason) {
          console.log(reason);
        }
      );
  }
  return Layer;
})();
const _Layer = Layer;
export { _Layer as Layer };
