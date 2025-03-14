/**
 * In-memory implementation of Fleet repository
 * Used for testing and development
 */
class InMemoryFleetRepository {
  constructor() {
    this.fleets = new Map();
  }

  /**
   * Saves or updates a fleet
   * @param {Fleet} fleet - The fleet to save
   * @throws {Error} If fleet is invalid
   * @returns {Fleet} The saved fleet
   */
  save(fleet) {
    if (!fleet || !fleet.userId) {
      throw new Error("Invalid fleet");
    }
    this.fleets.set(fleet.userId, fleet);
    return fleet;
  }

  /**
   * Finds a fleet by user ID
   * @param {string} userId - The user ID to search for
   * @returns {Fleet|undefined} The fleet if found
   */
  findByUserId(userId) {
    return this.fleets.get(userId);
  }

  /**
   * Checks if a fleet exists for a user
   * @param {string} userId - The user ID to check
   * @returns {boolean} True if fleet exists
   */
  exists(userId) {
    return this.fleets.has(userId);
  }
}

module.exports = InMemoryFleetRepository;
