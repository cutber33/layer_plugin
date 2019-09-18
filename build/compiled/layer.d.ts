/**
 * Created by johann on 08.07.19.
 */
export declare class Layer {
    url: any;
    geo: any;
    map: any;
    minzoom: any;
    maxzoom: any;
    bound: any;
    constructor(pUrl: any, pMap: any);
    refresh(newTimestamp: any, previousTimestamp: any): void;
}
