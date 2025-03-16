import { IGetVehicleLocationQuery } from '@/App/types';
import { IFleet, IVehicle, ILocation } from '@/Domain/types';

/**
 * Query to get the current location of a vehicle
 * Implements CQRS query pattern
 */
export class GetVehicleLocationQuery implements IGetVehicleLocationQuery {
  constructor(
    public readonly fleet: IFleet,
    public readonly vehicle: IVehicle
  ) {}

  /**
   * Executes the query to get the vehicle's current location
   * @returns The vehicle's current location or null if not found
   */
  execute(): ILocation | null {
    return this.fleet.getVehicleLocation(this.vehicle);
  }
} 