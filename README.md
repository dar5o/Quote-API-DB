# Quote-API-DB

---------------------------------

## Deployed on Heroku

()[project url here]

---------------------------------

## Web Application

This is a backend API and database for quotations. RBAC is implemented with an ACL to limit permissions. Has auth features (base-64, bcrypt, JWT) for creating, updating, and deleting an account, signing in, and posting and getting quotes that persist in the database.

Written with NodeJS, using ExpressJS for the server, Sequelize for the deployed database storage, Sqlite for creating a test database on a local machine, and Jest/SuperTest for unit testing the routes.

---------------------------------

## Tools Used

- Microsoft VSCode
- Node.js
- Express
- Sequelize
- Sqlite3
- Jest
- Supertest
- base-64
- bcrypt
- JSON Web Tokens (JWT)

---------------------------------

## Getting Started

Clone this repository to your local machine:

```terminal
git clone https://github.com/YourRepo/YourProject.git
```

Next, navigate to the target directory you cloned the repo into, and install the dependencies:

```terminal
cd YourRepo/YourProject
npm i
```

Using `.sample.env` as a template, create a file named `.env` to contain your environment variables. Use `NODE_ENV=test` in your test environment, and `NODE_ENV=production` wherever you deploy it.

---------------------------------

## Usage

`POST /signup`: requires username, password, and role in the request body. See Data Flow below for shape.

`POST /signin`: requires username and password in the Authorization request header.

`GET /users`: requires token for Bearer Auth, returns list of all usernames (admin role required).

`GET /quotes`:  reads all quotes (user or admin role required).

`GET /quotes/id`: reads the quote asscociated with the id parameter (user or admin role required).

`POST /quotes`: posts a quote from the request body (user or admin role required). See Data Flow below for shape.

`PATCH /quotes/id`: modifies the quote asscociated with the id parameter (admin role required).

`DELETE /quotes/id`: deletes the quote asscociated with the id parameter (admin role required).

---------------------------------

## Data Flow (Frontend, Backend, REST API) & Project Schema

**User:**

```javascript
{
"username": "<your username>", // string, required
"password": "<your password>", // string, required
"role": "<user or admin>" // string, defaults to 'user" if not provided
}
```

**Quote:**

```javascript
{
"quote": "<your quote>", // string, required
"source": "<quote source>" // string, defaults to 'unknown' if not provided
} 
```

![Wire Frame](/resources/wireframe.png)

---------------------------------

## Authors

- Andrew Enyeart [Github](https://github.com/aenyeart)
- Kellen Linse [Github](https://github.com/Kellen-Linse)
- Dario Vitorte [Github](https://github.com/dar5o)

---------------------------------
