import { IFleet, IVehicle, ILocation } from '../Domain/types';
import { IFleetRepository } from '../Domain/types';

export interface ICommand {
  execute(): Promise<void>;
}

export interface IQuery<T> {
  execute(): T;
}

export interface IRegisterVehicleCommand extends ICommand {
  fleetRepository: IFleetRepository;
  fleet: IFleet;
  vehicle: IVehicle;
}

export interface IParkVehicleCommand extends ICommand {
  fleetRepository: IFleetRepository;
  fleet: IFleet;
  vehicle: IVehicle;
  location: ILocation;
}

export interface IGetVehicleLocationQuery extends IQuery<ILocation | null> {
  fleet: IFleet;
  vehicle: IVehicle;
} 