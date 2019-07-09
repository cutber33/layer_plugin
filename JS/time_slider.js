/**
 * Created by johann on 08.07.19.
 */

export class Timeslider {
    constructor(configuration) {
        this.first = configuration.first;
        this.last = configuration.last;
        this.current = configuration.current;
        this.interval = configuration.interval;
        this.onPickedTimestamp = configuration.onPickedTimestamp;
        this.shownTs = this.currentTs;
        console.log(this.currentTs, this.lastTs, this.firstTs);
        this.timestamps = [];
        for (let o = this.firstTs; o <= this.lastTs && (o-this.firstTs)%this.interv==0; o=o+this.interv) {
            this.timestamps.push(o);
        }
        console.log(this.timestamps);
        this.onPickedTimestamp(this.currentTs);
    }



    set onPickedTs(callback) {
        this.onPickedTimestamp = callback;
        this.onPickedTimestamp(this.currentTs);
    }

    get currentTs() {
        return this.current;
    }

    get firstTs() {
        return this.first;
    }

    get lastTs() {
        return this.last;
    }

    get shownTs() {
        return this.currentTimestamp;
    }

    set shownTs(timestamp) {
        this.currentTimestamp = timestamp;
    }

    get interv(){
        return this.interval;
    }



    onForward() {
        this.shownTs = this.shownTs + this.interv;
    }

    onBackwards() {
        this.shownTs = this.shownTs - this.interv;
    }

}
