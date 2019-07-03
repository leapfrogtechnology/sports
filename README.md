# Sports

An application to manage the sports events. It includes the followings:

* Web App - The view only UI for the events.
* Admin App - The admin dashboard to manage the events.
* API - The backend part to make the management possible.

## All-in-one Setup (docker-compose)

* Copy the `.env.docker` and save as `.env`. Update the variables.

  **_NOTE: The db variables should be same inside the api folder as well for migrations to work._**

* Run `docker-compose up` from the root folder to run all the applications at once. To run a specific application use `docker-compose up <service_name>`. To run the application in background, use `docker-compose up -d <service_name>`. The logs can be seen through `docker-compose logs`.

* Checkout the applications through `http://localhost:<PORT>`.

* Run `docker-compose ps` from the root folder to check the status of the containers.

* To run the migrations, perform the following command from the root folder: `docker-compose exec api yarn migrate`.

* Similarly, for seeding: `docker-compose exec api yarn migrate`.

* To run other scripts, use the following command: `docker-compose exec <service_name> yarn <script_name>`.

* You can also execute the commands as usual by entering into the container: `docker-compose exec <service_name> bash`. It gives a bash shell.
