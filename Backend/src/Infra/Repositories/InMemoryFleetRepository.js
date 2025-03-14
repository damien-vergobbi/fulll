class InMemoryFleetRepository {
  constructor() {
    this.fleets = new Map();
  }

  save(fleet) {
    if (!fleet || !fleet.userId) {
      throw new Error("Fleet invalide");
    }
    this.fleets.set(fleet.userId, fleet);
    return fleet;
  }

  findByUserId(userId) {
    return this.fleets.get(userId);
  }

  exists(userId) {
    return this.fleets.has(userId);
  }
}

module.exports = InMemoryFleetRepository;
