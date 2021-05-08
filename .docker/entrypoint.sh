#!/bin/sh

wait-for-it collact-db:5432
npm run migration:run
npm run start:prod
