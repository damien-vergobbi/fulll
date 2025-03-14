/**
 * Common step definitions shared across features
 * Manages shared state and basic steps used in multiple scenarios
 *
 * State management:
 * - Fleets (my fleet and other's fleet)
 * - Current vehicle
 * - Error handling
 * - Fleet repository
 */

const { Given } = require("@cucumber/cucumber");
const Fleet = require("../../src/Domain/Fleet");
const Vehicle = require("../../src/Domain/Vehicle");
const RegisterVehicleCommand = require("../../src/App/Commands/RegisterVehicleCommand");
const InMemoryFleetRepository = require("../../src/Infra/Repositories/InMemoryFleetRepository");

// Shared state
const state = {
  myFleet: null,
  otherFleet: null,
  vehicle: null,
  error: null,
  fleetRepository: new InMemoryFleetRepository(),
};

// Getters & Setters
const getters = {
  getMyFleet: () => state.myFleet,
  getOtherFleet: () => state.otherFleet,
  getVehicle: () => state.vehicle,
  getError: () => state.error,
  getFleetRepository: () => state.fleetRepository,
};

const setters = {
  setError: (err) => {
    state.error = err;
  },
};

// Common steps
Given("my fleet", function () {
  state.myFleet = new Fleet("my-user");
  state.fleetRepository.save(state.myFleet);
});

Given("the fleet of another user", function () {
  state.otherFleet = new Fleet("other-user");
  state.fleetRepository.save(state.otherFleet);
});

Given("a vehicle", function () {
  state.vehicle = new Vehicle("AB-123-CD");
});

Given("I have registered this vehicle into my fleet", function () {
  const command = new RegisterVehicleCommand(
    state.fleetRepository,
    state.myFleet,
    state.vehicle
  );
  command.execute();
});

// Export
module.exports = {
  ...getters,
  ...setters,
};
