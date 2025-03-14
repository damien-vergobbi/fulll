class Fleet {
  constructor(userId) {
    if (!userId) {
      throw new Error("A fleet must be associated with a user");
    }
    this.userId = userId;
    this.vehicles = new Map();
  }

  hasVehicle(vehicle) {
    return this.vehicles.has(vehicle.plateNumber);
  }

  getVehicleLocation(vehicle) {
    const entry = this.vehicles.get(vehicle.plateNumber);
    return entry ? entry.location : null;
  }

  registerVehicle(vehicle) {
    if (this.hasVehicle(vehicle)) {
      throw new Error("This vehicle is already registered in this fleet");
    }
    this.vehicles.set(vehicle.plateNumber, { vehicle, location: null });
  }

  parkVehicle(vehicle, location) {
    if (!this.hasVehicle(vehicle)) {
      throw new Error("This vehicle is not registered in this fleet");
    }

    const currentLocation = this.getVehicleLocation(vehicle);
    if (currentLocation && currentLocation.equals(location)) {
      throw new Error("Vehicle already parked at this location");
    }

    this.vehicles.set(vehicle.plateNumber, { vehicle, location });
  }

  // For serialization/deserialization
  toJSON() {
    return {
      userId: this.userId,
      vehicles: Array.from(this.vehicles.entries()),
    };
  }

  static fromJSON(data) {
    const fleet = new Fleet(data.userId);
    data.vehicles.forEach(([plateNumber, entry]) => {
      fleet.vehicles.set(plateNumber, entry);
    });
    return fleet;
  }
}

module.exports = Fleet;
