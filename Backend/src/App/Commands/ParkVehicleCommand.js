/**
 * Command to park a vehicle at a specific location
 * Implements CQRS command pattern
 */
class ParkVehicleCommand {
  /**
   * @param {FleetRepository} fleetRepository - Repository to persist changes
   * @param {Fleet} fleet - The fleet containing the vehicle
   * @param {Vehicle} vehicle - The vehicle to park
   * @param {Location} location - Where to park the vehicle
   */
  constructor(fleetRepository, fleet, vehicle, location) {
    this.fleetRepository = fleetRepository;
    this.fleet = fleet;
    this.vehicle = vehicle;
    this.location = location;
  }

  /**
   * Executes the command
   * @throws {Error} If vehicle is not in fleet or already parked at location
   */
  async execute() {
    this.fleet.parkVehicle(this.vehicle, this.location);
    await this.fleetRepository.save(this.fleet);
  }
}

module.exports = ParkVehicleCommand;
