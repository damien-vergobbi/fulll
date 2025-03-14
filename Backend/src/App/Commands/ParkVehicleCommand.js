class ParkVehicleCommand {
  constructor(fleetRepository, fleet, vehicle, location) {
    this.fleetRepository = fleetRepository;
    this.fleet = fleet;
    this.vehicle = vehicle;
    this.location = location;
  }

  execute() {
    this.fleet.parkVehicle(this.vehicle, this.location);
    this.fleetRepository.save(this.fleet);
  }
}

module.exports = ParkVehicleCommand;
