const { Given } = require('@cucumber/cucumber');
const Fleet = require('../../src/Domain/Fleet');
const Vehicle = require('../../src/Domain/Vehicle');
const RegisterVehicleCommand = require('../../src/App/Commands/RegisterVehicleCommand');

// Shared state
const state = {
  myFleet: null,
  otherFleet: null,
  vehicle: null,
  error: null
};

// Getters & Setters
const getters = {
  getMyFleet: () => state.myFleet,
  getOtherFleet: () => state.otherFleet,
  getVehicle: () => state.vehicle,
  getError: () => state.error
};

const setters = {
  setError: (err) => { state.error = err }
};

// Common steps
Given('my fleet', function () {
  state.myFleet = new Fleet('my-user');
});

Given('the fleet of another user', function () {
  state.otherFleet = new Fleet('another-user');
});

Given('a vehicle', function () {
  state.vehicle = new Vehicle('AB-123-CD');
});

Given('I have registered this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(state.myFleet, state.vehicle);
  command.execute();
});

// Export getters & setters
module.exports = {
  ...getters,
  ...setters
};
