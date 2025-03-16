#!/usr/bin/env node

import { program } from "commander";

import { Fleet } from "@/Domain/Fleet";
import { Vehicle } from "@/Domain/Vehicle";
import { Location } from "@/Domain/Location";
import { ParkVehicleCommand } from "@/App/Commands/ParkVehicleCommand";
import { RegisterVehicleCommand } from "@/App/Commands/RegisterVehicleCommand";
import { SQLiteFleetRepository } from "@/Infra/Repositories/SQLiteFleetRepository";

const fleetRepository = new SQLiteFleetRepository();

program
  .name("fleet")
  .description("Fleet parking management CLI")
  .version("1.0.0");

program
  .command("create")
  .description("Create a new fleet")
  .argument("<userId>", "User ID for the fleet")
  .action(async (userId: string) => {
    try {
      // Check if the fleet already exists
      const existingFleet = await fleetRepository.findByUserId(userId);
      if (existingFleet) {
        console.error("Error: A fleet already exists for this user");
        process.exit(1);
      }

      const fleet = new Fleet(userId);
      await fleetRepository.save(fleet);
      console.log(`Fleet created successfully for user: ${userId}`);
    } catch (error) {
      console.error(
        "Error:",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      process.exit(1);
    }
  });

program
  .command("register-vehicle")
  .description("Register a vehicle in a fleet")
  .argument("<fleetId>", "Fleet ID")
  .argument("<vehiclePlateNumber>", "Vehicle plate number")
  .action(async (fleetId: string, vehiclePlateNumber: string) => {
    try {
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
      console.log(
        `Vehicle ${vehiclePlateNumber} registered successfully in fleet ${fleetId}`
      );
    } catch (error) {
      console.error(
        "Error:",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
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
    async (
      fleetId: string,
      vehiclePlateNumber: string,
      latitude: string,
      longitude: string,
      altitude?: string
    ) => {
      try {
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
        console.log(
          `Vehicle ${vehiclePlateNumber} localized successfully at position (lat:${latitude}, lon:${longitude}${
            altitude ? `, alt:${altitude}` : ""
          })`
        );
      } catch (error) {
        console.error(
          "Error:",
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        process.exit(1);
      }
    }
  );

program
  .command("list")
  .description(
    "[Debug command] Lists all fleets and their vehicles with locations. Not part of the official API."
  )
  .action(async () => {
    try {
      const fleets = await fleetRepository.findAll();
      if (fleets.length === 0) {
        console.log("No fleet found");
        return;
      }
      fleets.forEach((fleet) => {
        console.log(`Fleet ID: ${fleet.userId}`);
        const vehicles = Array.from(fleet.getVehicles().values());
        if (vehicles.length > 0) {
          console.log("  Vehicles:");
          vehicles.forEach((entry) => {
            console.log(`    - ${entry.vehicle.plateNumber}`);
            if (entry.location) {
              console.log(
                `      Position: lat:${entry.location.latitude}, lon:${
                  entry.location.longitude
                }${
                  entry.location.altitude
                    ? `, alt:${entry.location.altitude}`
                    : ""
                }`
              );
            }
          });
        } else {
          console.log("  No vehicle");
        }
        console.log("---");
      });
    } catch (error) {
      console.error(
        "Error:",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      process.exit(1);
    }
  });

program.parse();
