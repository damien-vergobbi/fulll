class ParkVehicleCommand {
  constructor(fleet, vehicle, location) {
    this.fleet = fleet;
    this.vehicle = vehicle;
    this.location = location;
  }

  execute() {
    this.fleet.parkVehicle(this.vehicle, this.location);
  }
}

module.exports = ParkVehicleCommand;
