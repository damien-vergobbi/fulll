export interface IVehicle {
  plateNumber: string;
  toJSON(): IVehicle;
}

export interface ILocation {
  latitude: number;
  longitude: number;
  altitude: number | null;
  equals(other: ILocation): boolean;
  toJSON(): ILocation;
}

export interface IFleetVehicle {
  vehicle: IVehicle;
  location: ILocation | null;
}

export interface IFleet {
  userId: string;
  getVehicles(): Map<string, IFleetVehicle>;
  hasVehicle(vehicle: IVehicle): boolean;
  getVehicleLocation(vehicle: IVehicle): ILocation | null;
  registerVehicle(vehicle: IVehicle): void;
  parkVehicle(vehicle: IVehicle, location: ILocation): void;
  toJSON(): any;
}

export interface IFleetRepository {
  save(fleet: IFleet): Promise<IFleet>;
  findByUserId(userId: string): Promise<IFleet | undefined>;
  exists(userId: string): Promise<boolean>;
  findAll(): Promise<IFleet[]>;
} 