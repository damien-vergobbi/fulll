class RegisterVehicleCommand {
  constructor(fleet, vehicle) {
    this.fleet = fleet;
    this.vehicle = vehicle;
  }

  execute() {
    this.fleet.registerVehicle(this.vehicle);
  }
}

module.exports = RegisterVehicleCommand;
