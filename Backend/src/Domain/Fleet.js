class Fleet {
  constructor(userId) {
    if (!userId) {
      throw new Error('Une flotte doit être associée à un utilisateur');
    }
    this.userId = userId;
    this.vehicles = new Map(); // Map<plateNumber, {vehicle: Vehicle, location: Location}>
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
      throw new Error('Ce véhicule est déjà enregistré dans cette flotte');
    }
    this.vehicles.set(vehicle.plateNumber, { vehicle, location: null });
  }

  parkVehicle(vehicle, location) {
    if (!this.hasVehicle(vehicle)) {
      throw new Error('Ce véhicule n\'est pas enregistré dans cette flotte');
    }

    const currentLocation = this.getVehicleLocation(vehicle);
    if (currentLocation && currentLocation.equals(location)) {
      throw new Error('Le véhicule est déjà garé à cet emplacement');
    }

    this.vehicles.set(vehicle.plateNumber, { vehicle, location });
  }
}

module.exports = Fleet; 