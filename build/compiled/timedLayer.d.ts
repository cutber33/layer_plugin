/**
 * Created by johann on 08.07.19.
 */
export declare class TimedLayer {
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
    onLoad: () => void;
    constructor(pUrl: any, pMap: any);
    refresh(newTimestamp: any): void;
    getFirst(): number;
    getLast(): number;
    getInterval(): number;
    setOnLoad(pFunction: any): void;
}
