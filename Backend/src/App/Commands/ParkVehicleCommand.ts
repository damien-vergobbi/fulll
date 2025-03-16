import { IFleet, IVehicle, ILocation } from '../../Domain/types';
import { IFleetRepository } from '../../Domain/types';
import { IParkVehicleCommand } from '../types';

/**
 * Command to park a vehicle at a specific location
 * Implements CQRS command pattern
 */
export class ParkVehicleCommand implements IParkVehicleCommand {
  constructor(
    public readonly fleetRepository: IFleetRepository,
    public readonly fleet: IFleet,
    public readonly vehicle: IVehicle,
    public readonly location: ILocation
  ) {}

  /**
   * Executes the command
   * @throws {Error} If vehicle is not in fleet or already parked at location
   */
  async execute(): Promise<void> {
    this.fleet.parkVehicle(this.vehicle, this.location);
    await this.fleetRepository.save(this.fleet);
  }
} 