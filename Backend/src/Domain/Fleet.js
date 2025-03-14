/**
 * Represents a fleet of vehicles for a specific user
 * Aggregate root in DDD terms
 */
class Fleet {
  constructor(userId) {
    if (!userId) {
      throw new Error("A fleet must be associated with a user");
    }
    this.userId = userId;
    this.vehicles = new Map();
  }

  /**
   * Checks if a vehicle is registered in this fleet
   * @param {Vehicle} vehicle - The vehicle to check
   * @returns {boolean} True if vehicle is in fleet
   */
  hasVehicle(vehicle) {
    return this.vehicles.has(vehicle.plateNumber);
  }

  /**
   * Gets the current location of a vehicle
   * @param {Vehicle} vehicle - The vehicle to locate
   * @returns {Location|null} The location or null if not found
   */
  getVehicleLocation(vehicle) {
    const entry = this.vehicles.get(vehicle.plateNumber);
    return entry ? entry.location : null;
  }

  /**
   * Registers a new vehicle in the fleet
   * @param {Vehicle} vehicle - The vehicle to register
   * @throws {Error} If vehicle is already registered
   */
  registerVehicle(vehicle) {
    if (this.hasVehicle(vehicle)) {
      throw new Error("This vehicle is already registered in this fleet");
    }
    this.vehicles.set(vehicle.plateNumber, { vehicle, location: null });
  }

  /**
   * Parks a vehicle at a specific location
   * @param {Vehicle} vehicle - The vehicle to park
   * @param {Location} location - Where to park the vehicle
   * @throws {Error} If vehicle is not registered or already parked at location
   */
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

  /**
   * Serializes the fleet for storage
   * @returns {Object} Serialized fleet data
   */
  toJSON() {
    return {
      userId: this.userId,
      vehicles: Array.from(this.vehicles.entries()),
    };
  }

  /**
   * Creates a Fleet instance from serialized data
   * @param {Object} data - Serialized fleet data
   * @returns {Fleet} New Fleet instance
   */
  static fromJSON(data) {
    const fleet = new Fleet(data.userId);
    data.vehicles.forEach(([plateNumber, entry]) => {
      fleet.vehicles.set(plateNumber, entry);
    });
    return fleet;
  }
}

module.exports = Fleet;
