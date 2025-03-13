class Fleet {
  constructor() {
    this.vehicles = [];
  }

  addVehicle(vehicle) {
    if (!this.vehicles.find(v => v.plateNumber === vehicle.plateNumber)) {
      this.vehicles.push(vehicle);
    } else {
      throw new Error('Vehicle already registered in this fleet');
    }
  }

  localizeVehicle(vehicle) {
    if (!this.vehicles.find(v => v.plateNumber === vehicle.plateNumber)) {
      throw new Error('Vehicle not registered in this fleet');
    }

    return this.vehicles.find(v => v.plateNumber === vehicle.plateNumber).location;
  }
}

module.exports = Fleet;