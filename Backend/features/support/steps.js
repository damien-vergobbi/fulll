const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const Location = require('../../src/Domain/Location');
const Vehicle = require('../../src/Domain/Vehicle');
const Fleet = require('../../src/Domain/Fleet');
const RegisterVehicleCommand = require('../../src/App/RegisterVehicleCommand');
const LocalizeVehicleCommand = require('../../src/App/LocalizeVehicleCommand');

let fleet;
let vehicle;

Given('my fleet', function() {
  fleet = new Fleet();
});

Given('a vehicle', function() {
  vehicle = new Vehicle('ABC123');
});

Given('I have registered this vehicle into my fleet', function() {
  const command = new RegisterVehicleCommand(fleet, vehicle);
  command.execute();
});

Given('a location', function () {
  location = new Location(12.345678, 98.765432);

  const command = new LocalizeVehicleCommand(fleet, vehicle);
  command.execute();
});

When('I register this vehicle into my fleet', function() {
  const command = new RegisterVehicleCommand(fleet, vehicle);
  command.execute();
});

When('I try to register this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(fleet, vehicle);
  command.execute();
});

Then('this vehicle should be part of my vehicle fleet', function() {
  assert.ok(fleet.vehicles.includes(vehicle));
});

Then('I should be informed this vehicle has already been registered into my fleet', function() {
  try {
    const command = new RegisterVehicleCommand(fleet, vehicle);
    command.execute();
  } catch (error) {
    assert.strictEqual(error.message, 'Vehicle already registered in this fleet');
  }
});