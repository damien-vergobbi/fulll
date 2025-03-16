import { IVehicle } from "@/Domain/types";

/**
 * Represents a vehicle with a license plate number
 * Immutable value object in DDD terms
 */
export class Vehicle implements IVehicle {
  constructor(public readonly plateNumber: string) {
    if (!plateNumber) {
      throw new Error("A vehicle must have a license plate number");
    }
  }

  /**
   * Checks if another vehicle is equal to this one
   * @param other - The vehicle to compare
   * @returns True if vehicles are equal
   */
  equals(other: Vehicle): boolean {
    return other instanceof Vehicle && other.plateNumber === this.plateNumber;
  }

  /**
   * Converts the vehicle to a JSON object
   * @returns JSON representation of the vehicle
   */
  toJSON(): IVehicle {
    return {
      plateNumber: this.plateNumber,
      toJSON: () => this.toJSON(),
    };
  }

  /**
   * Creates a new vehicle from a JSON object
   * @param data - JSON representation of the vehicle
   * @returns New vehicle instance
   */
  static fromJSON(data: IVehicle): Vehicle {
    return new Vehicle(data.plateNumber);
  }
}
