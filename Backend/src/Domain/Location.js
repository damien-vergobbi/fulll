class Location {
  constructor(latitude, longitude, altitude = null) {
    this.validateCoordinates(latitude, longitude);
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }

  validateCoordinates(latitude, longitude) {
    if (latitude < -90 || latitude > 90) {
      throw new Error('La latitude doit être comprise entre -90 et 90 degrés');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('La longitude doit être comprise entre -180 et 180 degrés');
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