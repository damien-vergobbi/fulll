/**
 * Represents a vehicle with a license plate number
 * Immutable value object in DDD terms
 */
class Vehicle {
  /**
   * @param {string} plateNumber - The license plate number of the vehicle
   */
  constructor(plateNumber) {
    if (!plateNumber) {
      throw new Error("A vehicle must have a license plate number");
    }
    this.plateNumber = plateNumber;
  }

  /**
   * Checks if another vehicle is equal to this one
   * @param {Vehicle} other - The vehicle to compare
   * @returns {boolean} True if vehicles are equal
   */
  equals(other) {
    return other instanceof Vehicle && other.plateNumber === this.plateNumber;
  }

  toJSON() {
    return {
      plateNumber: this.plateNumber
    };
  }

  static fromJSON(data) {
    return new Vehicle(data.plateNumber);
  }
}

module.exports = Vehicle;
