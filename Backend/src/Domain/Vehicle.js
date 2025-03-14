class Vehicle {
  constructor(plateNumber) {
    if (!plateNumber) {
      throw new Error('A vehicle must have a license plate number');
    }
    this.plateNumber = plateNumber;
  }

  equals(other) {
    return other instanceof Vehicle && other.plateNumber === this.plateNumber;
  }
}

module.exports = Vehicle;
