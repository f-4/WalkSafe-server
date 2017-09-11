#!/bin/sh

THE_USER=postgres
THE_DB=walksafe
THE_TABLE=staging_sfs
THE_DIR=$(pwd)
THE_FILE=the_file.csv

PSQL -U ${THE_USER} ${THE_DB}
COPY ${THE_TABLE} FROM '${THE_DIR}/${THE_FILE}' delimiter ',' csv header;
