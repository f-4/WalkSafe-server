test

# WalkSafe Server

> Mobile app on Android and iOS that provides the user crime density heatmap, real time crime updates using SpotCrime API, and many more safety features.


## Table of Contents

1. [Team](#team)
1. [Demo](#demo)
1. [Screenshots](#screenshots)
    1. [iOS Screenshots](#ios-screenshots)
    1. [Android Screenshots](#android-screenshots)
1. [Initial Setup](#initial-setup)
1. [Seeding Databases](#seeding-databases)
    1. [Auto-Seed Local Database](#auto-seed-local-database)
    1. [Auto-Seed AWS EC2 Database](#auto-seed-aws-ec2-database)
    1. [Seed AWS EC2 Database](#seed-aws-ec2-database)
    1. [Seed AWS RDS Database](#seed-aws-rds-database)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Installing PostgreSQL and PostGIS](#installing-postgresql-and-postgis)
    1. [Developing Heatmap](#developing-heatmap)
    1. [Roadmap](#roadmap)
1. [WalkSafe Client](#walksafe-client)
1. [Contributing](#contributing)


## Team

  - __Product Owner__: Fredy-Edwin Esse
  - __Scrum Master__: Rick Gallegos
  - __Development Team Members__: Sonrisa Chen and Brian Kim

## Demo

View a video of WalkSafe in action [here](https://www.youtube.com/watch?v=R41ELsbPc04)

## Screenshots

### iOS Screenshots

### Android Screenshots

[Landing page](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0b/610185/85f4ff48731dc9cd3e2bc44c403dcdcc-original.png)

[Heat Map](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0b/610185/ae2a55c33ed5fe10f4786c633c583a72-original.png)

[Recent Crimes](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0b/610185/d677a360bdab0935da1c8d5288fd9a72-original.png)

[App Drawer](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/0b/610185/d8572595533d0624134dac4269724f3a-original.png)

## Initial Setup

1. Fork and clone the repo
1. Download and install PostgreSQL and PostGIS
1. Create walksafe database
1. Enable PostGIS on walksafe database
1. In your terminal from within the root directory of your WalkSafe Server folder:
```sh
npm install
npm start
```

> __Environment Variables__ WalkSafe Server requires a Mapbox Access Token and Spotcrime API key to use the Mapbox and Spotcrime API on the backend. For Auth0 authentication, WalkSafe requires Facebook and Google credentials along with their corresponding callback urls that the WalkSafe Client will receive and then use to query WalkSafe server. We have used the .env package, which allows environment variables to be set easily with the .env file in the root directory of the project. An example of the necessary variables for WalkSafe Server been provided here in this repo.

> __WalkSafe Server and Local Host__ A fair warning when connecting from the WalkSafe Client: Emulated Android devices on Android Studio and iOS devices on Xcode run their own local host so setting the WalkSafe Client environmental variables to route to localhost or 127.0.0.1 will have requests that never reach their destination.  Use the appropriate IP address to connect to your WalkSafe Server.

## Seeding Databases

1. Add csv files to /db/csv/
2. Change seed.js to reflect csv files added

### Auto-Seed Local Database

3. From within the root directory:
```sh
npm run seed
```

### Seed AWS EC2 Database
3. Open up PSQL shell on local computer
4. Connect to EC2 DB with team username and password
5. Use \copy command to upload csv files into the EC2 DB

### Seed AWS RDS Database
3. Open up PSQL shell on local computer
4. Connect to RDS DB with team username and password
5. Use \copy command to upload csv files into the RDS DB

### Auto-Seed AWS EC2 Database
1. SSH into EC2 DB
1. Filezilla to drop new csv files into /var/www/WalkSafe-server/db/csv folder
1. SSH into EC2 Server
```
npm run seed
```

## Requirements

- Node 0.10.x
- React Native 0.47.0
- [Facebook Credentials](https://developers.facebook.com)
- [Google Credentials](https://console.developers.google.com)
- [WalkSafe Client](https://github.com/f-4/WalkSafe)
- [PostgreSQL](https://www.postgresql.org/download)
- [PostGIS](http://postgis.net/install)
- [PGAdmin](https://www.pgadmin.org)

## Development

### Installing Dependencies

From within the root directory:
```sh
npm install
```

### Installing PostgreSQL and PostGIS

1. Download and install PostgreSQL [here](https://www.postgresql.org/download)
1. Enable PostGIS extension during installation
  1. If this option does not pop up then download PostGIS [here](http://postgis.net/install)
1. Download and install PGAdmin [here](https://www.pgadmin.org)
1. Open PGAdmin
1. On the left-hand side click on Servers
1. Click on PostgreSQL to connect to PostgreSQL
1. Right click on PostgreSQL
1. Click Create
1. Click Database and name it 'walksafe'
1. Click Walksafe database
1. Right click Extensions
1. Click Create
1. Click Extension
1. Under the General Tab go to the Name field and select 'postgis'

- If PostGIS is not here try manually adding it in terminal:
  ```sh
  psql -d walksafe -c "CREATE EXTENSION postgis;"
  ```
- If PostGIS is still undetected make sure you have downloaded and installed [PostGIS](http://postgis.net/install)
- Tables are located under Schema > Public > Tables

### Developing Heatmap

- Qgis
- Mapbox
- CSV files
- Seed
- PostgreSQL PostGIS

### Roadmap

View the project roadmap [here](https://github.com/f-4/WalkSafe/issues)

## WalkSafe Client Repo

View the WalkSafe Client repo
[here](https://github.com/f-4/WalkSafe)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
