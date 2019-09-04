/**
 * Created by johann on 08.07.19.
 */

export class TimedLayer {
  url: any;
  geo: any;
  map: any;
  minZoom: any;
  maxZoom: any;
  bounds: any;
  first: number;
  last: number;
  interval: number;
  attribution: string;
  str: any;

  public onLoad: () => void;
  constructor(pUrl, pMap) {
    this.url = pUrl;
    this.map = pMap;

    let self = this;
    fetch(this.url)
      .then(function(response) {
        return response.json();
      })
      .then(function(mbJson) {
        let jsonFile = mbJson;
        //Get the tiles
        self.str = jsonFile["tiles"][0];

        self.first = jsonFile["time"]["first"];
        self.last = jsonFile["time"]["last"];
        self.interval = jsonFile["time"]["interval"];
        self.attribution = jsonFile["attribution"];
        self.minZoom = jsonFile["minzoom"];
        self.maxZoom = jsonFile["maxzoom"];
        self.bounds = jsonFile["bounds"];

        self.map.setZoom(self.minZoom);
        self.map.setMinZoom(self.minZoom);
        self.map.setMaxZoom(self.maxZoom);

        //set bounds

        let boundsSW = [self.bounds[0], self.bounds[1]];
        let boundsNE = [self.bounds[2], self.bounds[3]];
        let maxBounds = [boundsSW, boundsNE];
        self.map.setMaxBounds(maxBounds);

        console.log("onload");
        self.onLoad();
      });
  }

  public refresh(newTimestamp) {
    let self = this;
    /*
    if (map.getLayer("sat-tiles")) {
      map.removeLayer("sat-tiles").removeSource("sat-tiles");
    }
    */

    //Try to fetch one-time information only once to improve performance

    let date = new Date(newTimestamp * 1000);
    let date2 = new Date((newTimestamp + self.interval) * 1000);
    let date3 = new Date((newTimestamp + 2 * self.interval) * 1000);
    let dates = [date, date2, date3];

    let years = [];
    for (let i = 0; i < dates.length; i++) {
      let y = dates[i].getFullYear().toString();
      years.push(y);
    }

    let months = [];

    for (let i = 0; i < dates.length; i++) {
      let m = (dates[i].getMonth() + 1).toString();
      if (m.toString().length < 2) {
        m = "0" + m.toString();
      }
      months.push(m);
    }

    let days = [];

    for (let i = 0; i < dates.length; i++) {
      let d = dates[i].getDate().toString();
      if (d.toString().length < 2) {
        d = "0" + d;
      }
      days.push(d);
    }

    let hours = [];

    for (let i = 0; i < dates.length; i++) {
      let h = dates[i].getHours().toString();
      if (h.toString().length < 2) {
        h = "0" + h;
      }
      hours.push(h);
    }

    let minutes = [];

    for (let i = 0; i < dates.length; i++) {
      let m = dates[i].getMinutes().toString();
      if (m.toString().length < 2) {
        m = "0" + m;
      }
      minutes.push(m);
    }

    //Replace the date placeholders with the real date

    //console.log(urls[5]);

    //set Map Zoom Settin

    /*
          let minZoom = jsonFile["minzoom"];
          let maxZoom = jsonFile["maxzoom"];
          let bounds = jsonFile["bounds"];
          */

    /*
    if (previousTimestamp == null) {
      self.map.setZoom(self.minZoom);
      self.map.setMinZoom(self.minZoom);
      self.map.setMaxZoom(self.maxZoom);

      //set bounds

      let boundsSW = [self.bounds[0], self.bounds[1]];
      let boundsNE = [self.bounds[2], self.bounds[3]];
      let maxBounds = [boundsSW, boundsNE];
      self.map.setMaxBounds(maxBounds);
    }
    */

    let placeholders = ["{year}", "{month}", "{day}", "{hour}", "{minute}"];
    let fillers: String[] = [
      years[0],
      months[0],
      days[0],
      hours[0],
      minutes[0]
    ];
    let fillers2: String[] = [
      years[1],
      months[1],
      days[1],
      hours[1],
      minutes[1]
    ];
    let fillers3: String[] = [
      years[2],
      months[2],
      days[2],
      hours[2],
      minutes[2]
    ];

    let url2 = "",
      url3 = "",
      url4 = "",
      url5 = "",
      url6 = "";
    let urls = [self.str, url2, url3, url4, url5, url6];

    function loadTiles(filler, placeholder, urls) {
      for (let i = 0; i <= fillers.length; i++) {
        urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
      }
      self.map.addSource("sat-tiles", {
        type: "raster",
        tiles: [urls[5]],
        tileSize: 512
      });

      self.map.addLayer({
        id: "sat-tiles",
        type: "raster",
        source: "sat-tiles",
        minzoom: self.minZoom,
        maxzoom: self.maxZoom
      });
    }

    function loadTiles2(filler, placeholder, urls) {
      for (let i = 0; i <= filler.length; i++) {
        urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
      }

      self.map.addSource("sat-tiles2", {
        type: "raster",
        tiles: [urls[5]],
        tileSize: 512
      });

      self.map.addLayer({
        id: "sat-tiles2",
        type: "raster",
        source: "sat-tiles2",
        minzoom: self.minZoom,
        maxzoom: self.maxZoom
      });
    }

    function loadTiles3(filler, placeholder, urls) {
      for (let i = 0; i <= filler.length; i++) {
        urls[i + 1] = urls[i].replace(placeholder[i], filler[i]);
      }

      self.map.addSource("sat-tiles3", {
        type: "raster",
        tiles: [urls[5]],
        tileSize: 512
      });

      self.map.addLayer({
        id: "sat-tiles3",
        type: "raster",
        source: "sat-tiles3",
        minzoom: self.minZoom,
        maxzoom: self.maxZoom
      });
    }

    function diashow() {
      let url2 = "",
        url3 = "",
        url4 = "",
        url5 = "",
        url6 = "";
      let urls = [self.str, url2, url3, url4, url5, url6];

      //TODO: https://gis.stackexchange.com/questions/240134/mapbox-gl-js-source-loaded-event

      /*
      if (
        previousTimestamp != null &&
        newTimestamp != previousTimestamp + self.interval
      ) {
        if (self.map.getLayer("sat-tiles")) {
          self.map.removeLayer("sat-tiles").removeSource("sat-tiles");
        }
        if (self.map.getLayer("sat-tiles2")) {
          self.map.removeLayer("sat-tiles2").removeSource("sat-tiles2");
        }
        if (self.map.getLayer("sat-tiles3")) {
          self.map.removeLayer("sat-tiles3").removeSource("sat-tiles3");
        }
      }
      */

      if (self.map.getLayer("sat-tiles")) {
        console.log("1");
        if (
          self.map.getLayer("sat-tiles2") &&
          self.map.getLayer("sat-tiles3")
        ) {
          console.log(2);
          self.map.removeLayer("sat-tiles").removeSource("sat-tiles");
        } else if (!self.map.getLayer("sat-tiles2")) {
          console.log(3);
          loadTiles2(fillers2, placeholders, urls);
          self.map.removeLayer("sat-tiles3").removeSource("sat-tiles3");
        } else {
          console.log(4);
          loadTiles3(fillers2, placeholders, urls);
          self.map.removeLayer("sat-tiles").removeSource("sat-tiles");
          //try removing Layer 1 here so that there is no delay
        }
      } else {
        if (
          self.map.getLayer("sat-tiles2") &&
          self.map.getLayer("sat-tiles3")
        ) {
          console.log(5);
          loadTiles(fillers2, placeholders, urls);
          self.map.removeLayer("sat-tiles2").removeSource("sat-tiles2");
        } else {
          console.log(6);
          loadTiles3(fillers3, placeholders, urls);
          loadTiles2(fillers2, placeholders, urls);
          loadTiles(fillers, placeholders, urls);
          console.log(fillers, fillers2, fillers3);
        }
      }
    }
    diashow();
  }
  /*
    if (map.getLayer("sat-tiles3")) {
      fetch(geo)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          let geo = json;
          map.addSource("geoj", {
            type: "geojson",
            data: geo
          });
          map.addLayer(
            {
              id: "geo",
              type: "circle",
              source: "geoj",
              paint: {
                "circle-radius": 6,
                "circle-color": "#B42222"
              },
              filter: ["==", "$type", "Point"]
            },
            "sat-tiles3"
          );
        });
        
    }
    */ public getFirst() {
    return this.first;
  }

  public getLast() {
    return this.last;
  }

  public getInterval() {
    return this.interval;
  }

  public setOnLoad(pFunction) {
    this.onLoad = pFunction;
  }
}
