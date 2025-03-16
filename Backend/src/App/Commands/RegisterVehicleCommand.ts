import { IFleet, IVehicle } from '../../Domain/types';
import { IFleetRepository } from '../../Domain/types';
import { IRegisterVehicleCommand } from '../types';

/**
 * Command to register a vehicle in a fleet
 * Implements CQRS command pattern
 */
export class RegisterVehicleCommand implements IRegisterVehicleCommand {
  constructor(
    public readonly fleetRepository: IFleetRepository,
    public readonly fleet: IFleet,
    public readonly vehicle: IVehicle
  ) {}

  /**
   * Executes the command
   * @throws {Error} If vehicle is already registered
   */
  async execute(): Promise<void> {
    this.fleet.registerVehicle(this.vehicle);
    await this.fleetRepository.save(this.fleet);
  }
} 