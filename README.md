# Sports

[![Build Status](https://travis-ci.org/leapfrogtechnology/sports.svg?branch=master)](https://travis-ci.org/leapfrogtechnology/sports)

An application to manage the sports events. It includes the followings:

* Web App - The view only UI for the events.
* Admin App - The admin dashboard to manage the events.
* API - The backend part to make the management possible.

## Individual setup

* For individual setup, refer to the specific project folder.

## All-in-one Setup (docker)

* Copy the `.env.docker` and save as `.env`. Update the variables required for docker compose.

* Copy the `api/.env.example` and save as `api/.env`. Update the variables required for the database.

* Run `docker-compose up` from the root folder to run all the applications at once. To run a specific application use `docker-compose up <service_name>`. To run the application in background, use `docker-compose up -d <service_name>`. The logs can be seen through `docker-compose logs`.

* Checkout the applications through `http://localhost:<PORT>`.

* Run `docker-compose ps` from the root folder to check the status of the containers.

* To run the migrations, perform the following command from the root folder: `docker-compose exec api yarn migrate`.

* Similarly, for seeding: `docker-compose exec api yarn migrate`.

* To run other scripts, use the following command: `docker-compose exec <service_name> yarn <script_name>`.

* You can also execute the commands as usual by entering into the container: `docker-compose exec <service_name> bash`. It gives a bash shell.
