class Location {
  constructor(latitude, longitude, altitude = null) {
    this.validateCoordinates(latitude, longitude);
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }

  validateCoordinates(latitude, longitude) {
    if (latitude < -90 || latitude > 90) {
      throw new Error('Latitude must be between -90 and 90 degrees');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('Longitude must be between -180 and 180 degrees');
    }
  }

  equals(other) {
    return other instanceof Location &&
      other.latitude === this.latitude &&
      other.longitude === this.longitude &&
      other.altitude === this.altitude;
  }
}

module.exports = Location;
