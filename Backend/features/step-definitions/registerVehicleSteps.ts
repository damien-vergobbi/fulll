import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";

import { RegisterVehicleCommand } from "@/App/Commands/RegisterVehicleCommand";
import common from "./commonSteps";

/**
 * Step definitions for vehicle registration feature
 * Implements scenarios:
 * - Register a new vehicle
 * - Prevent duplicate registration
 * - Allow same vehicle in multiple fleets
 */
Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    const otherFleet = common.getOtherFleet();
    const vehicle = common.getVehicle();
    if (!otherFleet || !vehicle) {
      throw new Error("Other fleet or vehicle not initialized");
    }

    const command = new RegisterVehicleCommand(
      common.getFleetRepository(),
      otherFleet,
      vehicle
    );
    await command.execute();
  }
);

When("I register this vehicle into my fleet", async function () {
  try {
    const fleet = common.getMyFleet();
    const vehicle = common.getVehicle();
    if (!fleet || !vehicle) {
      throw new Error("Fleet or vehicle not initialized");
    }

    const command = new RegisterVehicleCommand(
      common.getFleetRepository(),
      fleet,
      vehicle
    );
    await command.execute();
    common.setError(null);
  } catch (e) {
    common.setError(e as Error);
  }
});

When("I try to register this vehicle into my fleet", async function () {
  try {
    const fleet = common.getMyFleet();
    const vehicle = common.getVehicle();
    if (!fleet || !vehicle) {
      throw new Error("Fleet or vehicle not initialized");
    }

    const command = new RegisterVehicleCommand(
      common.getFleetRepository(),
      fleet,
      vehicle
    );
    await command.execute();
    common.setError(null);
  } catch (e) {
    common.setError(e as Error);
  }
});

Then("this vehicle should be part of my vehicle fleet", function () {
  const fleet = common.getMyFleet();
  const vehicle = common.getVehicle();
  if (!fleet || !vehicle) {
    throw new Error("Fleet or vehicle not initialized");
  }

  assert.ok(fleet.hasVehicle(vehicle));
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    const error = common.getError();
    assert.ok(error);
    assert.equal(
      error?.message,
      "This vehicle is already registered in this fleet"
    );
  }
);
