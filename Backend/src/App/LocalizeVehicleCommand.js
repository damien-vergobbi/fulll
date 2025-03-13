class LocalizeVehicleCommand {
  constructor(fleet, vehicle, location) {
    this.fleet = fleet;
    this.vehicle = vehicle;
    this.location = location;
  }

  execute() {
    return this.fleet.localizeVehicle(this.vehicle);
  }
}

module.exports = LocalizeVehicleCommand;
