class GetVehicleLocationQuery {
  constructor(fleet, vehicle) {
    this.fleet = fleet;
    this.vehicle = vehicle;
  }

  execute() {
    return this.fleet.getVehicleLocation(this.vehicle);
  }
}

module.exports = GetVehicleLocationQuery; 