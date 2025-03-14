const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const RegisterVehicleCommand = require("../../src/App/Commands/RegisterVehicleCommand");
const common = require("./commonSteps");

// Specific steps for registering a vehicle
Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    const command = new RegisterVehicleCommand(
      common.getFleetRepository(),
      common.getOtherFleet(),
      common.getVehicle()
    );
    command.execute();
  }
);

When("I register this vehicle into my fleet", function () {
  try {
    const command = new RegisterVehicleCommand(
      common.getFleetRepository(),
      common.getMyFleet(),
      common.getVehicle()
    );
    command.execute();
    common.setError(null);
  } catch (e) {
    common.setError(e);
  }
});

When("I try to register this vehicle into my fleet", function () {
  try {
    const command = new RegisterVehicleCommand(
      common.getFleetRepository(),
      common.getMyFleet(),
      common.getVehicle()
    );
    command.execute();
    common.setError(null);
  } catch (e) {
    common.setError(e);
  }
});

Then("this vehicle should be part of my vehicle fleet", function () {
  assert.ok(common.getMyFleet().hasVehicle(common.getVehicle()));
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    assert.ok(common.getError());
    assert.equal(
      common.getError().message,
      "This vehicle is already registered in this fleet"
    );
  }
);
