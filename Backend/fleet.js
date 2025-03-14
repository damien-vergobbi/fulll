#!/usr/bin/env node

const { program } = require("commander");
const Fleet = require("./src/Domain/Fleet");
const Vehicle = require("./src/Domain/Vehicle");
const Location = require("./src/Domain/Location");
const RegisterVehicleCommand = require("./src/App/Commands/RegisterVehicleCommand");
const ParkVehicleCommand = require("./src/App/Commands/ParkVehicleCommand");
const SQLiteFleetRepository = require("./src/Infra/Repositories/SQLiteFleetRepository");

const fleetRepository = new SQLiteFleetRepository();

program
  .name("fleet")
  .description("Fleet parking management CLI")
  .version("1.0.0");

program
  .command("create")
  .description("Create a new fleet")
  .argument("<userId>", "User ID for the fleet")
  .action(async (userId) => {
    try {
      // Check if the fleet already exists
      const existingFleet = await fleetRepository.findByUserId(userId);
      if (existingFleet) {
        console.error("Error: A fleet already exists for this user");
        process.exit(1);
      }

      const fleet = new Fleet(userId);
      await fleetRepository.save(fleet);
      console.log(`Fleet successfully created with id: ${userId}`);
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

program
  .command("register-vehicle")
  .description("Register a vehicle in a fleet")
  .argument("<fleetId>", "Fleet ID")
  .argument("<vehiclePlateNumber>", "Vehicle plate number")
  .action(async (fleetId, vehiclePlateNumber) => {
    try {
      // Check if the fleet exists
      const fleet = await fleetRepository.findByUserId(fleetId);
      if (!fleet) {
        console.error(
          `Error: No fleet found for user ${fleetId}. Use 'create' first.`
        );
        process.exit(1);
      }

      const vehicle = new Vehicle(vehiclePlateNumber);
      const command = new RegisterVehicleCommand(
        fleetRepository,
        fleet,
        vehicle
      );
      await command.execute();
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

program
  .command("localize-vehicle")
  .description("Park a vehicle at a specific location")
  .argument("<fleetId>", "Fleet ID")
  .argument("<vehiclePlateNumber>", "Vehicle plate number")
  .argument("<latitude>", "Latitude")
  .argument("<longitude>", "Longitude")
  .argument("[altitude]", "Optional altitude")
  .action(
    async (fleetId, vehiclePlateNumber, latitude, longitude, altitude) => {
      try {
        // Check if the fleet exists
        const fleet = await fleetRepository.findByUserId(fleetId);
        if (!fleet) {
          console.error(`Error: No fleet found for user ${fleetId}`);
          process.exit(1);
        }
        
        const vehicle = new Vehicle(vehiclePlateNumber);
        const location = new Location(
          parseFloat(latitude),
          parseFloat(longitude),
          altitude ? parseFloat(altitude) : null
        );
        const command = new ParkVehicleCommand(
          fleetRepository,
          fleet,
          vehicle,
          location
        );
        await command.execute();
      } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
      }
    }
  );

program
  .command("list")
  .description(
    "[Debug command] Lists all fleets and their vehicles with locations."
  )
  .action(async () => {
    try {
      // Check if the fleet exists
      const fleets = await fleetRepository.findAll();
      if (fleets.length === 0) {
        console.log("No fleets found");
        return;
      }

      // Print all fleets and their vehicles with locations
      fleets.forEach((fleet) => {
        console.log(`Fleet ID: ${fleet.userId}`);
        const vehicles = Array.from(fleet.vehicles.values());
        if (vehicles.length > 0) {
          console.log("  Vehicles:");
          vehicles.forEach((entry) => {
            console.log(`    - ${entry.vehicle.plateNumber}`);
            if (entry.location) {
              console.log(
                `      Position: lat: ${entry.location.latitude}, long: ${
                  entry.location.longitude
                }${
                  entry.location.altitude
                    ? `, alt: ${entry.location.altitude}`
                    : ""
                }`
              );
            }
          });
        } else {
          console.log("  No vehicles");
        }
        console.log("---");
      });
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

program.parse();
