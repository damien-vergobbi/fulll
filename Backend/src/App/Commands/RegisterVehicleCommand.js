/**
 * Command to register a vehicle in a fleet
 * Implements CQRS command pattern
 */
class RegisterVehicleCommand {
  /**
   * @param {FleetRepository} fleetRepository - Repository to persist changes
   * @param {Fleet} fleet - The fleet to add the vehicle to
   * @param {Vehicle} vehicle - The vehicle to register
   */
  constructor(fleetRepository, fleet, vehicle) {
    this.fleetRepository = fleetRepository;
    this.fleet = fleet;
    this.vehicle = vehicle;
  }

  /**
   * Executes the command
   * @throws {Error} If vehicle is already registered
   */
  async execute() {
    this.fleet.registerVehicle(this.vehicle);
    await this.fleetRepository.save(this.fleet);
  }
}

module.exports = RegisterVehicleCommand;
