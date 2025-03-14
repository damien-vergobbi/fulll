/**
 * Represents a location with latitude, longitude, and optional altitude
 * Immutable value object in DDD terms
 */
class Location {
  /**
   * @param {number} latitude - Latitude coordinate
   * @param {number} longitude - Longitude coordinate
   * @param {number|null} altitude - Optional altitude
   */
  constructor(latitude, longitude, altitude = null) {
    this.validateCoordinates(latitude, longitude);
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }

  /**
   * Validates the coordinates of the location
   * @param {number} latitude - Latitude coordinate
   * @param {number} longitude - Longitude coordinate
   * @throws {Error} If coordinates are invalid
   */
  validateCoordinates(latitude, longitude) {
    if (latitude < -90 || latitude > 90) {
      throw new Error("Latitude must be between -90 and 90 degrees");
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error("Longitude must be between -180 and 180 degrees");
    }
  }

  /**
   * Checks if another location is equal to this one
   * @param {Location} other - The location to compare
   * @returns {boolean} True if locations are equal
   */
  equals(other) {
    return (
      other instanceof Location &&
      other.latitude === this.latitude &&
      other.longitude === this.longitude &&
      other.altitude === this.altitude
    );
  }

  toJSON() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      altitude: this.altitude
    };
  }

  static fromJSON(data) {
    return new Location(data.latitude, data.longitude, data.altitude);
  }
}

module.exports = Location;
