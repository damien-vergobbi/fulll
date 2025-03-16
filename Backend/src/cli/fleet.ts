#!/usr/bin/env node

import { program } from 'commander';

import { Fleet } from '@/Domain/Fleet';
import { Vehicle } from '@/Domain/Vehicle';
import { Location } from '@/Domain/Location';
import { ParkVehicleCommand } from '@/App/Commands/ParkVehicleCommand';
import { RegisterVehicleCommand } from '@/App/Commands/RegisterVehicleCommand';
import { SQLiteFleetRepository } from '@/Infra/Repositories/SQLiteFleetRepository';

const fleetRepository = new SQLiteFleetRepository();

program
  .name('fleet')
  .description('Fleet parking management CLI')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new fleet')
  .argument('<userId>', 'User ID for the fleet')
  .action(async (userId: string) => {
    try {
      // Check if the fleet already exists
      const existingFleet = await fleetRepository.findByUserId(userId);
      if (existingFleet) {
        console.error('Erreur: Une flotte existe déjà pour cet utilisateur');
        process.exit(1);
      }

      const fleet = new Fleet(userId);
      await fleetRepository.save(fleet);
      console.log(`Flotte créée avec succès pour l'utilisateur: ${userId}`);
    } catch (error) {
      console.error('Erreur:', error instanceof Error ? error.message : 'Une erreur inconnue est survenue');
      process.exit(1);
    }
  });

program
  .command('register-vehicle')
  .description('Register a vehicle in a fleet')
  .argument('<fleetId>', 'Fleet ID')
  .argument('<vehiclePlateNumber>', 'Vehicle plate number')
  .action(async (fleetId: string, vehiclePlateNumber: string) => {
    try {
      const fleet = await fleetRepository.findByUserId(fleetId);
      if (!fleet) {
        console.error(`Erreur: Aucune flotte trouvée pour l'utilisateur ${fleetId}. Utilisez d'abord la commande 'create'.`);
        process.exit(1);
      }
      const vehicle = new Vehicle(vehiclePlateNumber);
      const command = new RegisterVehicleCommand(fleetRepository, fleet, vehicle);
      await command.execute();
      console.log(`Véhicule ${vehiclePlateNumber} enregistré avec succès dans la flotte de ${fleetId}`);
    } catch (error) {
      console.error('Erreur:', error instanceof Error ? error.message : 'Une erreur inconnue est survenue');
      process.exit(1);
    }
  });

program
  .command('localize-vehicle')
  .description('Park a vehicle at a specific location')
  .argument('<fleetId>', 'Fleet ID')
  .argument('<vehiclePlateNumber>', 'Vehicle plate number')
  .argument('<latitude>', 'Latitude')
  .argument('<longitude>', 'Longitude')
  .argument('[altitude]', 'Optional altitude')
  .action(async (
    fleetId: string,
    vehiclePlateNumber: string,
    latitude: string,
    longitude: string,
    altitude?: string
  ) => {
    try {
      const fleet = await fleetRepository.findByUserId(fleetId);
      if (!fleet) {
        console.error(`Erreur: Aucune flotte trouvée pour l'utilisateur ${fleetId}`);
        process.exit(1);
      }
      const vehicle = new Vehicle(vehiclePlateNumber);
      const location = new Location(
        parseFloat(latitude),
        parseFloat(longitude),
        altitude ? parseFloat(altitude) : null
      );
      const command = new ParkVehicleCommand(fleetRepository, fleet, vehicle, location);
      await command.execute();
      console.log(`Véhicule ${vehiclePlateNumber} localisé avec succès à la position (${latitude}, ${longitude}${altitude ? `, ${altitude}` : ''})`);
    } catch (error) {
      console.error('Erreur:', error instanceof Error ? error.message : 'Une erreur inconnue est survenue');
      process.exit(1);
    }
  });

program
  .command('list')
  .description('[Debug command] Lists all fleets and their vehicles with locations. Not part of the official API.')
  .action(async () => {
    try {
      const fleets = await fleetRepository.findAll();
      if (fleets.length === 0) {
        console.log('Aucune flotte trouvée');
        return;
      }
      fleets.forEach(fleet => {
        console.log(`Fleet ID: ${fleet.userId}`);
        const vehicles = Array.from(fleet.getVehicles().values());
        if (vehicles.length > 0) {
          console.log('  Véhicules:');
          vehicles.forEach(entry => {
            console.log(`    - ${entry.vehicle.plateNumber}`);
            if (entry.location) {
              console.log(`      Position: ${entry.location.latitude}, ${entry.location.longitude}${entry.location.altitude ? `, ${entry.location.altitude}` : ''}`);
            }
          });
        } else {
          console.log('  Aucun véhicule');
        }
        console.log('---');
      });
    } catch (error) {
      console.error('Erreur:', error instanceof Error ? error.message : 'Une erreur inconnue est survenue');
      process.exit(1);
    }
  });

program.parse(); 