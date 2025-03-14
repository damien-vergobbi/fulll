const { Given } = require('@cucumber/cucumber');
const Fleet = require('../../src/Domain/Fleet');
const Vehicle = require('../../src/Domain/Vehicle');
const RegisterVehicleCommand = require('../../src/App/Commands/RegisterVehicleCommand');

// Shared variables between steps
let myFleet;
let otherFleet;
let vehicle;
let error;

// Common steps
Given('my fleet', function () {
  myFleet = new Fleet('user-1');
});

Given('the fleet of another user', function () {
  otherFleet = new Fleet('user-2');
});

Given('a vehicle', function () {
  vehicle = new Vehicle('ABC123');
});

Given('I have registered this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(myFleet, vehicle);
  command.execute();
}); 

// Export for specific step files
module.exports = {
  getMyFleet: () => myFleet,
  getOtherFleet: () => otherFleet,
  getVehicle: () => vehicle,
  getError: () => error,
  setError: (err) => { error = err; }
};
