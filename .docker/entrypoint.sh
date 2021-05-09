#!/bin/sh

wait-for-it $TYPEORM_DB_HOST:$TYPEORM_DB_PORT
npm run migration:run
npm run start:prod
