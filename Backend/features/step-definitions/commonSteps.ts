import { Given } from "@cucumber/cucumber";

import { Fleet } from "@/Domain/Fleet";
import { Vehicle } from "@/Domain/Vehicle";
import { IFleet, IVehicle } from "@/Domain/types";
import { RegisterVehicleCommand } from "@/App/Commands/RegisterVehicleCommand";
import { InMemoryFleetRepository } from "@/Infra/Repositories/InMemoryFleetRepository";

/**
 * Common step definitions shared across features
 * Manages shared state and basic steps used in multiple scenarios
 *
 * State management:
 * - Fleets (my fleet and other's fleet)
 * - Current vehicle
 * - Error handling
 * - Fleet repository
 */
interface TestState {
  myFleet: IFleet | null;
  otherFleet: IFleet | null;
  vehicle: IVehicle | null;
  error: Error | null;
  fleetRepository: InMemoryFleetRepository;
}

// Shared state
const state: TestState = {
  myFleet: null,
  otherFleet: null,
  vehicle: null,
  error: null,
  fleetRepository: new InMemoryFleetRepository(),
};

// Getters & Setters
const getters = {
  getMyFleet: (): IFleet | null => state.myFleet,
  getOtherFleet: (): IFleet | null => state.otherFleet,
  getVehicle: (): IVehicle | null => state.vehicle,
  getError: (): Error | null => state.error,
  getFleetRepository: (): InMemoryFleetRepository => state.fleetRepository,
};

const setters = {
  setError: (err: Error | null): void => {
    state.error = err;
  },
};

// Common steps
Given("my fleet", function () {
  state.myFleet = new Fleet("my-user");
  state.fleetRepository.save(state.myFleet);
});

Given("the fleet of another user", function () {
  state.otherFleet = new Fleet("other-user");
  state.fleetRepository.save(state.otherFleet);
});

Given("a vehicle", function () {
  state.vehicle = new Vehicle("AB-123-CD");
});

Given("I have registered this vehicle into my fleet", async function () {
  if (!state.myFleet || !state.vehicle) {
    throw new Error("Fleet or vehicle not initialized");
  }
  const command = new RegisterVehicleCommand(
    state.fleetRepository,
    state.myFleet,
    state.vehicle
  );
  await command.execute();
});

// Export
export default {
  ...getters,
  ...setters,
};
