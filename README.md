# WalkSafe

##talk about adding PostGIS in PostGres here

##Updating EC2 DB with seed file
1. SSH into EC2 DB
1. Filezilla to drop new csv files into /var/www/WalkSafe-server/db/csv folder
1. SSH into EC2 Server
```
npm run seed
```
##Updating EC2 DB by hand
1. Open up PSQL shell on local computer
1. Connect to EC2 DB with team username and password
1. use \copy command to upload csv files into the EC2 DB

##Updating RDS DB by hand
1. Open up PSQL shell on local computer
1. Connect to RDS DB with team username and password
1. use \copy command to upload csv files into the RDS DB
