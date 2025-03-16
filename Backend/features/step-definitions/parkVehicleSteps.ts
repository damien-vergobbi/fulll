import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";

import { ILocation } from "@/Domain/types";
import { Location } from "@/Domain/Location";
import { ParkVehicleCommand } from "@/App/Commands/ParkVehicleCommand";
import { GetVehicleLocationQuery } from "@/App/Queries/GetVehicleLocationQuery";
import common from "./commonSteps";

/**
 * Step definitions for vehicle parking feature
 * Implements scenarios:
 * - Park a vehicle at a location
 * - Prevent parking at same location twice
 * - Track vehicle location
 */
let location: ILocation;

Given("a location", function () {
  location = new Location(42.3522, 2.3522);
});

Given("my vehicle has been parked into this location", async function () {
  const fleet = common.getMyFleet();
  const vehicle = common.getVehicle();
  if (!fleet || !vehicle) {
    throw new Error("Fleet or vehicle not initialized");
  }

  const command = new ParkVehicleCommand(
    common.getFleetRepository(),
    fleet,
    vehicle,
    location
  );
  await command.execute();
});

When("I park my vehicle at this location", async function () {
  try {
    const fleet = common.getMyFleet();
    const vehicle = common.getVehicle();
    if (!fleet || !vehicle) {
      throw new Error("Fleet or vehicle not initialized");
    }

    const command = new ParkVehicleCommand(
      common.getFleetRepository(),
      fleet,
      vehicle,
      location
    );
    await command.execute();
    common.setError(null);
  } catch (e) {
    common.setError(e as Error);
  }
});

When("I try to park my vehicle at this location", async function () {
  try {
    const fleet = common.getMyFleet();
    const vehicle = common.getVehicle();
    if (!fleet || !vehicle) {
      throw new Error("Fleet or vehicle not initialized");
    }

    const command = new ParkVehicleCommand(
      common.getFleetRepository(),
      fleet,
      vehicle,
      location
    );
    await command.execute();
    common.setError(null);
  } catch (e) {
    common.setError(e as Error);
  }
});

Then(
  "the known location of my vehicle should verify this location",
  function () {
    const fleet = common.getMyFleet();
    const vehicle = common.getVehicle();
    if (!fleet || !vehicle) {
      throw new Error("Fleet or vehicle not initialized");
    }

    const query = new GetVehicleLocationQuery(fleet, vehicle);
    const vehicleLocation = query.execute();
    assert.ok(vehicleLocation?.equals(location));
  }
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    const error = common.getError();
    assert.ok(error);
    assert.equal(error?.message, "Vehicle already parked at this location");
  }
);
