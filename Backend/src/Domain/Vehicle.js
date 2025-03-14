class Vehicle {
  constructor(plateNumber) {
    if (!plateNumber) {
      throw new Error('Un véhicule doit avoir un numéro d\'immatriculation');
    }
    this.plateNumber = plateNumber;
  }

  equals(other) {
    return other instanceof Vehicle && other.plateNumber === this.plateNumber;
  }
}

module.exports = Vehicle; 