const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const Fleet = require("../../Domain/Fleet");

class SQLiteFleetRepository {
  constructor() {
    this.dbPromise = this.initializeDatabase();
  }

  async initializeDatabase() {
    const db = await open({
      filename: "./fleet.db",
      driver: sqlite3.Database,
    });

    // Create tables if they don't exist
    await db.exec(`
            CREATE TABLE IF NOT EXISTS fleets (
                userId TEXT PRIMARY KEY,
                data TEXT NOT NULL
            );
        `);

    return db;
  }

  async save(fleet) {
    if (!fleet || !fleet.userId) {
      throw new Error("Invalid fleet");
    }

    const db = await this.dbPromise;
    const fleetData = fleet.toJSON();

    await db.run("INSERT OR REPLACE INTO fleets (userId, data) VALUES (?, ?)", [
      fleet.userId,
      JSON.stringify(fleetData),
    ]);

    return fleet;
  }

  async findByUserId(userId) {
    const db = await this.dbPromise;
    const row = await db.get(
      "SELECT data FROM fleets WHERE userId = ?",
      userId
    );

    if (!row) {
      return undefined;
    }

    const data = JSON.parse(row.data);
    return Fleet.fromJSON(data);
  }

  async exists(userId) {
    const db = await this.dbPromise;
    const row = await db.get("SELECT 1 FROM fleets WHERE userId = ?", userId);
    return row !== undefined;
  }

  async findAll() {
    const db = await this.dbPromise;
    const rows = await db.all("SELECT data FROM fleets");
    return Promise.all(
      rows.map(async (row) => {
        const data = JSON.parse(row.data);
        return Fleet.fromJSON(data);
      })
    );
  }
}

module.exports = SQLiteFleetRepository;
