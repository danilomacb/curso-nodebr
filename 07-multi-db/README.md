sudo docker run \
 --name postgres \
 -e POSTGRES_USER=danilomacb \
 -e POSTGRES_PASSWORD=cafeforte \
 -e POSTGRES_DB=heroes \
 -p 5432:5432 \
 -d \
 postgres

sudo docker ps

sudo docker exec -it postgres /bin/bash

sudo docker run \
 --name adminer \
 -p 8080:8080 \
 --link postgres:postgres \
 -d \
 adminer

## MONGODB

sudo docker run\
 --name mongodb \
 -p 27017:27017 \
 -e MONGO_INITDB_ROOT_USERNAME=admin \
 -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
 -d \
 mongo:4

sudo docker run --name mongoclient -p 3000:3000 -d -e MONGO_URL=mongodb://admin:senhaadmin@mongodb:27017/admin --link mongodb:mongodb mongoclient/mongoclient

sudo docker exec -it mongodb \
 mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
 --eval "db.getSiblingDB('herois').createUser({user: 'danilomacb', pwd: 'cafeforte', roles: [{role: 'readWrite', db: 'herois'}]})"
