/**
 * Created by johann on 08.07.19.
 */

export class Timeslider {
  first: number;
  last: number;
  current: number;
  interval: number;
  onChange: any;
  shown: number;
  timestamps: number[] = [];
  constructor(configuration) {
    this.first = configuration.first;
    this.last = configuration.last;
    this.current = configuration.current;
    this.interval = configuration.interval;
    if (configuration.onChange == null) {
      this.onChange = function(newTimestamp, previousTimestamp) {
        console.log(newTimestamp, previousTimestamp);
      };
    } else {
      this.onChange = configuration.onChange;
    }
    this.shown = this.current;
    for (
      let o = this.first;
      o <= this.last && (o - this.first) % this.interval == 0;
      o = o + this.interval
    ) {
      this.timestamps.push(o);
    }

    let style = document.createElement("style");

    document.getElementById("map").style.zIndex = "-999";

    let forwardButton = document.createElement("button");
    forwardButton.setAttribute("id", "forwardButton");
    forwardButton.innerHTML = "Do Something";

    // 2. Append somewhere
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(forwardButton);

    // 3. Add event handler
    forwardButton.addEventListener("click", this.onForward);
  }

  onForward() {
    let nextTimestamp = this.shown + this.interval;
    this.onChange(nextTimestamp, this.shown);
  }

  onBackwards() {
    let nextTimestamp = this.shown - this.interval;
    this.onChange(nextTimestamp, this.shown);
  }
}
