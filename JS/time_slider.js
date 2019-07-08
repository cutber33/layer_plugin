/**
 * Created by johann on 08.07.19.
 */
import {ShowLayer} from "./show_layer.js";

export class Timeslider {
    constructor(map, url) {
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (mbJson) {
                let jsonFile = mbJson;

                let first = jsonFile["time"]["first"];
                let last = jsonFile["time"]["last"];
                let interval = jsonFile["time"]["interval"];
                const layer = new ShowLayer(url, map, first);
                //console.log(layer.timestamp);
               return layer;
            }, function(reason) {
                console.log(reason);
            });

    }
}
