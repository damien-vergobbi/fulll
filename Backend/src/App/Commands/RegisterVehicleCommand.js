class RegisterVehicleCommand {
  constructor(fleetRepository, fleet, vehicle) {
    this.fleetRepository = fleetRepository;
    this.fleet = fleet;
    this.vehicle = vehicle;
  }

  execute() {
    this.fleet.registerVehicle(this.vehicle);
    this.fleetRepository.save(this.fleet);
  }
}

module.exports = RegisterVehicleCommand;
