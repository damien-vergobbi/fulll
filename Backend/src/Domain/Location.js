class Location {
    constructor(lat, lng, alt = null) {
      this.lat = lat;
      this.lng = lng;
      this.alt = alt;
    }
  }
  
  module.exports = Location;