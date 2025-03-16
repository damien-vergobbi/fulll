import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

import { IFleet, IFleetRepository } from "@/Domain/types";
import { Fleet } from "@/Domain/Fleet";

/**
 * SQLite implementation of Fleet repository
 * Implements persistence in SQLite database
 */
export class SQLiteFleetRepository implements IFleetRepository {
  private dbPromise: Promise<Database>;

  constructor() {
    this.dbPromise = this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<Database> {
    const db = await open({
      filename: "./fleet.db",
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS fleets (
        userId TEXT PRIMARY KEY,
        data TEXT NOT NULL
      );
    `);

    return db;
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

    const db = await this.dbPromise;
    const fleetData = fleet.toJSON();

    await db.run("INSERT OR REPLACE INTO fleets (userId, data) VALUES (?, ?)", [
      fleet.userId,
      JSON.stringify(fleetData),
    ]);

    return fleet;
  }

  /**
   * Finds a fleet by user ID
   * @param userId - The user ID to search for
   * @returns The fleet if found
   */
  async findByUserId(userId: string): Promise<IFleet | undefined> {
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

  /**
   * Checks if a fleet exists for a user
   * @param userId - The user ID to check
   * @returns True if fleet exists
   */
  async exists(userId: string): Promise<boolean> {
    const db = await this.dbPromise;
    const row = await db.get("SELECT 1 FROM fleets WHERE userId = ?", userId);
    return row !== undefined;
  }

  /**
   * Returns all fleets
   * @returns Array of all fleets
   */
  async findAll(): Promise<IFleet[]> {
    const db = await this.dbPromise;
    const rows = await db.all("SELECT data FROM fleets");
    return Promise.all(rows.map((row) => Fleet.fromJSON(JSON.parse(row.data))));
  }
}
