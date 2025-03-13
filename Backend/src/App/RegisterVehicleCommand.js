class RegisterVehicleCommand {
  constructor(fleet, vehicle) {
    this.fleet = fleet;
    this.vehicle = vehicle;
  }

  execute() {
    this.fleet.addVehicle(this.vehicle);
  }
}

module.exports = RegisterVehicleCommand;
