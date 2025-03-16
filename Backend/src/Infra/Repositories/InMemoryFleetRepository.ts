import { IFleet, IFleetRepository } from "@/Domain/types";

/**
 * In-memory implementation of Fleet repository
 * Used for testing and development
 */
export class InMemoryFleetRepository implements IFleetRepository {
  private fleets: Map<string, IFleet>;

  constructor() {
    this.fleets = new Map();
  }

  /**
   * Saves or updates a fleet
   * @param fleet - The fleet to save
   * @throws {Error} If fleet is invalid
   * @returns The saved fleet
   */
  async save(fleet: IFleet): Promise<IFleet> {
    if (!fleet || !fleet.userId) {
      throw new Error("Invalid fleet");
    }
    this.fleets.set(fleet.userId, fleet);
    return fleet;
  }

  /**
   * Finds a fleet by user ID
   * @param userId - The user ID to search for
   * @returns The fleet if found
   */
  async findByUserId(userId: string): Promise<IFleet | undefined> {
    return this.fleets.get(userId);
  }

  /**
   * Checks if a fleet exists for a user
   * @param userId - The user ID to check
   * @returns True if fleet exists
   */
  async exists(userId: string): Promise<boolean> {
    return this.fleets.has(userId);
  }

  /**
   * Returns all fleets
   * @returns Array of all fleets
   */
  async findAll(): Promise<IFleet[]> {
    return Array.from(this.fleets.values());
  }
}
