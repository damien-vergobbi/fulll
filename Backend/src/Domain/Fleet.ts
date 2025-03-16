import { Vehicle } from './Vehicle';
import { Location } from './Location';
import { IFleet, IFleetVehicle, IVehicle, ILocation } from './types';

/**
 * Represents a fleet of vehicles for a specific user
 * Aggregate root in DDD terms
 */
export class Fleet implements IFleet {
  private vehicles: Map<string, IFleetVehicle>;

  constructor(public readonly userId: string) {
    if (!userId) {
      throw new Error("A fleet must be associated with a user");
    }
    this.vehicles = new Map();
  }

  /**
   * Checks if a vehicle is registered in this fleet
   * @param vehicle - The vehicle to check
   * @returns True if vehicle is in fleet
   */
  hasVehicle(vehicle: Vehicle): boolean {
    return this.vehicles.has(vehicle.plateNumber);
  }

  /**
   * Gets the current location of a vehicle
   * @param vehicle - The vehicle to locate
   * @returns The location or null if not found
   */
  getVehicleLocation(vehicle: Vehicle): ILocation | null {
    const entry = this.vehicles.get(vehicle.plateNumber);
    return entry ? entry.location : null;
  }

  /**
   * Registers a new vehicle in the fleet
   * @param vehicle - The vehicle to register
   * @throws {Error} If vehicle is already registered
   */
  registerVehicle(vehicle: Vehicle): void {
    if (this.hasVehicle(vehicle)) {
      throw new Error("This vehicle is already registered in this fleet");
    }
    this.vehicles.set(vehicle.plateNumber, { vehicle, location: null });
  }

  /**
   * Parks a vehicle at a specific location
   * @param vehicle - The vehicle to park
   * @param location - Where to park the vehicle
   * @throws {Error} If vehicle is not registered or already parked at location
   */
  parkVehicle(vehicle: Vehicle, location: Location): void {
    if (!this.hasVehicle(vehicle)) {
      throw new Error("This vehicle is not registered in this fleet");
    }

    const currentLocation = this.getVehicleLocation(vehicle);
    if (currentLocation && currentLocation.equals(location)) {
      throw new Error("Vehicle already parked at this location");
    }

    this.vehicles.set(vehicle.plateNumber, { vehicle, location });
  }

  /**
   * Gets all vehicles in the fleet
   * @returns Map of vehicles and their locations
   */
  getVehicles(): Map<string, IFleetVehicle> {
    return new Map(this.vehicles);
  }

  toJSON(): any {
    return {
      userId: this.userId,
      vehicles: Array.from(this.vehicles.entries()).map(([plateNumber, entry]) => ({
        plateNumber,
        vehicle: entry.vehicle.toJSON(),
        location: entry.location ? entry.location.toJSON() : null
      }))
    };
  }

  static fromJSON(data: any): Fleet {
    const fleet = new Fleet(data.userId);
    if (data.vehicles && Array.isArray(data.vehicles)) {
      data.vehicles.forEach((entry: any) => {
        const vehicle = Vehicle.fromJSON(entry.vehicle);
        const location = entry.location ? Location.fromJSON(entry.location) : null;
        fleet.vehicles.set(entry.plateNumber, { vehicle, location });
      });
    }
    return fleet;
  }
} 