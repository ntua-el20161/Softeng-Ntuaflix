
# Ntuaflix

Ntuaflix is a RESTful web service built with Node.js and Express. This application provides the service for exploring detailed information about various cinematic titles and their contributors.




## Prerequisites

Ensure that you have the following installed in your machine:

- Node.js
- npm
- MongoDB


## Setup

### Step 1: Deployment
Clone the repository

```bash
git clone https://github.com/ntua/softeng23-15.git
```
Navigate to the cloned repository:
```
cd softeng23-15
```
Launch the app with the following command:
```
npm run deploy
```
The application is launched but the database is not configured yet. Below you can find the steps to create the database and populate it using the CLI.

### Step 2: Create the database
To continue with this step you must have MongoDB installed in your machine.

Detailed Information about creating a MongoDB database:

[https://www.mongodb.com/basics/create-database](https://www.mongodb.com/basics/create-databaseF)

Example Steps for creation from the MongoDB Shell:

- Enter the MongoDB shell:
```
mongosh
```

- Create the database:
```
use sample_data_softeng
```

- Add a dummy document for the database to be created. You may delete this later.
```
db.dummy.insertOne({data: "This is just a dummy"})
```

Make sure to name your database 'sample_data_softeng' as this name is hardcoded in the source code!


### Step 3: Populate the database
Before continuing please make sure that the backend is connected to the database. This can be achieved with 2 ways:
- From the root directory
```
npm run deploy 
```
- From the back-end folder
```
cd back-end
npm install
npm start
```

Populate the database using the CLI.
- Navigate to the CLI folder and configure it:
```bash
cd cli-client
npm install
npm link
```
 - Upload the .tsv files found in the same folder to your database.
    For example, you can upload the titles of the database with the following command:

```
se2315 newtitles --filename truncated_title.basics.tsv
```

### Step 5: Done!
If you havent done it already you can redeploy the app from the root directory:
```
npm run deploy
```
If you already did, just refresh the page in which the app is deployed!




## Documentation
REST API Postman documentation :

[https://documenter.getpostman.com/view/31100561/2s9YyqiNAF](https://documenter.getpostman.com/view/31100561/2s9YyqiNAF)



