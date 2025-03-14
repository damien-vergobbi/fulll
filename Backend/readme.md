# Requirements
To run this project you will need a computer with Node, Typescript and Cucumber installed.

# Install
To install the project, you just have to run `yarn install` to get all the dependencies

# Running the tests
After installing the dependencies you can run the tests with this command `yarn test`.

# Init
Make the CLI executable

```bash
chmod +x fleet.js
```

# CLI Commands

```bash
./fleet.js create <userId> # returns fleetId on the standard output
./fleet.js register-vehicle <fleetId> <vehiclePlateNumber>
./fleet.js localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```

## Debug Commands
The following commands are available for debugging and development purposes:

```bash
# List all fleets and their vehicles with locations
./fleet list

# Reset database
rm fleet.db
```