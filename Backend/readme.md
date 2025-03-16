## Installation

```bash
yarn install
```

## Development

### Build

Create the executable `fleet` file at the root:
```bash
yarn build
```

### Testing

Run the test suite:
```bash
yarn test
```

## Usage

### CLI Commands

```bash
./fleet create <userId> # returns fleetId on the standard output
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```

### Development Commands

```bash
# List all fleets and their vehicles with locations
./fleet list

# Clean database, executable and dist directory
yarn clean
```

## Architecture

This project follows Domain-Driven Design (DDD) and Command Query Responsibility Segregation (CQRS) principles:

- `src/Domain/` - Domain models and interfaces
- `src/App/` - Application layer with commands and queries
- `src/Infra/` - Infrastructure layer with repositories

## Database

The system uses SQLite for persistence. The database file (`fleet.db`) is automatically created in the root directory.
