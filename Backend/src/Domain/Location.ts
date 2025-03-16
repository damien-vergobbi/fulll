import { ILocation } from './types';

/**
 * Represents a location with latitude, longitude, and optional altitude
 * Immutable value object in DDD terms
 */
export class Location implements ILocation {
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly altitude: number | null;

  /**
   * @param latitude - Latitude coordinate
   * @param longitude - Longitude coordinate
   * @param altitude - Optional altitude
   */
  constructor(latitude: number, longitude: number, altitude: number | null = null) {
    this.validateCoordinates(latitude, longitude);
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }

  /**
   * Validates the coordinates of the location
   * @param latitude - Latitude coordinate
   * @param longitude - Longitude coordinate
   * @throws {Error} If coordinates are invalid
   */
  private validateCoordinates(latitude: number, longitude: number): void {
    if (latitude < -90 || latitude > 90) {
      throw new Error("Latitude must be between -90 and 90 degrees");
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error("Longitude must be between -180 and 180 degrees");
    }
  }

  /**
   * Checks if another location is equal to this one
   * @param other - The location to compare
   * @returns True if locations are equal
   */
  equals(other: Location): boolean {
    return (
      other instanceof Location &&
      other.latitude === this.latitude &&
      other.longitude === this.longitude &&
      other.altitude === this.altitude
    );
  }

  toJSON(): ILocation {
    const location = {
      latitude: this.latitude,
      longitude: this.longitude,
      altitude: this.altitude,
      equals: this.equals.bind(this),
      toJSON: () => this.toJSON()
    };
    return location;
  }

  static fromJSON(data: ILocation): Location {
    return new Location(data.latitude, data.longitude, data.altitude);
  }
} 