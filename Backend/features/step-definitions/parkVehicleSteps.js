const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const Location = require("../../src/Domain/Location");
const ParkVehicleCommand = require("../../src/App/Commands/ParkVehicleCommand");
const GetVehicleLocationQuery = require("../../src/App/Queries/GetVehicleLocationQuery");
const common = require("./commonSteps");

let location;

// Specific steps for parking
Given("a location", function () {
  location = new Location(42.3522, 2.3522);
});

Given("my vehicle has been parked into this location", function () {
  const command = new ParkVehicleCommand(
    common.getFleetRepository(),
    common.getMyFleet(),
    common.getVehicle(),
    location
  );
  command.execute();
});

When("I park my vehicle at this location", function () {
  try {
    const command = new ParkVehicleCommand(
      common.getFleetRepository(),
      common.getMyFleet(),
      common.getVehicle(),
      location
    );
    command.execute();
    common.setError(null);
  } catch (e) {
    common.setError(e);
  }
});

When("I try to park my vehicle at this location", function () {
  try {
    const command = new ParkVehicleCommand(
      common.getFleetRepository(),
      common.getMyFleet(),
      common.getVehicle(),
      location
    );
    command.execute();
    common.setError(null);
  } catch (e) {
    common.setError(e);
  }
});

Then(
  "the known location of my vehicle should verify this location",
  function () {
    const query = new GetVehicleLocationQuery(
      common.getMyFleet(),
      common.getVehicle()
    );
    const vehicleLocation = query.execute();
    assert.ok(vehicleLocation.equals(location));
  }
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    assert.ok(common.getError());
    assert.equal(
      common.getError().message,
      "Vehicle already parked at this location"
    );
  }
);
