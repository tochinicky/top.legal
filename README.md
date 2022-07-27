# Contract Management


## Introduction

Contract Management API is a HTTP REST API built for the Contract Management platform, it consists of different endpoints that readily available for use.

## Overview

**What you can do with this API:**

- Signup as a user
- login as a user
- Create contract 
- get list of contract ids
- get a contract by contract id


## Set Up Development

- Check that the latest version on nodejs is installed:

```
  node --version
  >> v14.4.0 or greater
  or 
  Download node from https://nodejs.org/en/download/
```

- Clone the top.legal repo and cd into it:

```bash
  git clone https://github.com/tochinicky/top.legal
  cd top.legal
```

- Install dependencies:

```bash
  npm install serverless -g
  npm install
  sls dynamodb install
```


- Run the application with the command:

```
  npm start
```


- Create a `.env` file in the root folder and add all the configuration in the `.env` file to it. Make sure you replace the values with the right values:

```
  # General settings
    CONTRACT_TABLE = <CONTRACT_TABLE>
    USERS_TABLE = <USERS_TABLE>
    JWT_KEY = <JWT_KEY>
    PORT= <PORT>
```

- Run tests with the command:

```
  npm test
```

## Documentation

To run the documentation after fully starting the project, go to `/api-docs`
