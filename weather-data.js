"use strict";

function Weather(cityName, description) {
    this.cityName = cityName;
    this.description = description;
    // this._temperature = '';
}
var val;
Object.defineProperty(Weather.prototype, 'temperature', {
    get: function () {
        return this._temperature;
    },
    set: function (value) {
        this._temperature = value + " K";
        val = value;
    }
});