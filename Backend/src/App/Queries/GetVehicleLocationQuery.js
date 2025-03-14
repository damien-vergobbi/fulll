/**
 * Query to get the current location of a vehicle
 * Implements CQRS query pattern
 */
class GetVehicleLocationQuery {
  /**
   * @param {Fleet} fleet - The fleet containing the vehicle
   * @param {Vehicle} vehicle - The vehicle to locate
   */
  constructor(fleet, vehicle) {
    this.fleet = fleet;
    this.vehicle = vehicle;
  }

  /**
   * Executes the query to get the vehicle's current location
   * @returns {Location|null} The vehicle's current location or null if not found
   */
  execute() {
    return this.fleet.getVehicleLocation(this.vehicle);
  }
}

module.exports = GetVehicleLocationQuery;
