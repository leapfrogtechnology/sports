# Authentication EndPoints

**Endpoint: api.sports/lftechnology.com/graphql**

## **Login**

Login an user.

- **Method:**

  `Mutation: login`

- **Params**

  `email*=[string]`
  `password*=[string]`

- **Success Response:**

  ```json
  "data": {
    "login": {
      "message": "Login successful",
      "code": null,
      "data": null,
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbXBsb3llZUlkIjoyLCJ1c2VyUm9sZUlkIjozLCJwYXNzd29yZCI6IiQyYiQxMCQ5WHcuQ1lLVHN4OUlFMkQzSG1DSFlPd1V3NFlMdnkwTDA3TFpnTUpZRHgybXhaclhhZU1ZMiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE5LTA3LTA3VDA0OjQ5OjEzLjkxOVoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA3LTA3VDA0OjQ5OjEzLjkyMloifSwiaXNSZWZyZXNoVG9rZW4iOnRydWUsImlhdCI6MTU2Mjg0MTg4NCwiZXhwIjoxNTYzNDQ2Njg0fQ.umvIkVhJ8bnCjkcBnGdW2dlxw4Wo27tnnzM2sJegTWc",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbXBsb3llZUlkIjoyLCJ1c2VyUm9sZUlkIjozLCJwYXNzd29yZCI6IiQyYiQxMCQ5WHcuQ1lLVHN4OUlFMkQzSG1DSFlPd1V3NFlMdnkwTDA3TFpnTUpZRHgybXhaclhhZU1ZMiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE5LTA3LTA3VDA0OjQ5OjEzLjkxOVoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA3LTA3VDA0OjQ5OjEzLjkyMloifSwiaWF0IjoxNTYyODQxODg0LCJleHAiOjE1NjI4NDU0ODR9.9i5Lg6aVCM9l3O3jYrx8UG529u7Ufq-95H5D2XyO7bg"
    }
  }
  ```

- **Error Response:**

  ```json
  "data": {
    "login": {
      "message": "Employee not Found",
      "code": 404,
      "data": null,
      "refreshToken": null,
      "accessToken": null
    }
  }
  ```

- **Error Response:**

  ```json
  "data": {
    "login": {
      "message": "Invalid Password",
      "code": 400,
      "data": null,
      "refreshToken": null,
      "accessToken": null
    }
  }
  `

  ```

- **Error Response:**

  ```json
  "data": {
    "login": {
      "message": "User account not found",
      "code": 404,
      "data": null,
      "refreshToken": null,
      "accessToken": null
    }
  }
  ```

- **Error Response:**

  ```json
  "data": {
    "login": {
      "message": "Either username or password is missing",
      "code": 400,
      "data": null,
      "refreshToken": null,
      "accessToken": null
    }
  }
  `
  ```

## **SignUp**

SignUp an user.

- **Method:**

  `Mutation: signUp`

- **Params**

  `email*=[string]`
  `password*=[string]`

- **Success Response:**

  ```json
  "data": {
    "signUp": {
      "message": "Success",
      "code": 201,
      "data": null
    	}
  	}
  ```

- **Error Response:**

  ```json
  "data": {
    "login": {
      "message": "Employee not Found",
      "code": 404,
      "data": null
    	}
    }
  ```

- **Error Response:**

  ```json
  "data": {
    "signUp": {
      "message": "Email Already Taken",
      "code": 409,
      "data": null
      }
    }
  ```

- **Error Response:**

  ```json
  "data": {
    "login": {
      "message": "Either username or password is missing",
      "code": 400,
      "data": null,
      "refreshToken": null,
      "accessToken": null
      }
    }
  ```

## **Refresh Access Token**

Refreshes access token after it has expired.

- **Method:**

  `Mutation: refreshAccessToken`

- **Params**

  `refreshToken*=[string]`

- **Success Response:**

  ```json
  "data": {
    "refreshAccessToken": {
      "message": "Token created successfully",
      "code": 200,
      "data": null,
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbXBsb3llZUlkIjo2LCJ1c2VyUm9sZUlkIjozLCJwYXNzd29yZCI6IiQyYiQxMCR5ZTJLVHkzUy5CVHcweXJSYXpYb3VPQTdVNGsxRW1FaWdUbE5yNzFYNy5sZUNrL0xGeThMcSIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE5LTA3LTEyVDE3OjQ2OjU3LjY3OVoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA3LTEyVDE3OjQ2OjU3LjY5NloifSwiaWF0IjoxNTYyOTU1MzYzLCJleHAiOjE1NjI5NTg5NjN9.wCpvISU_JCsHrdB9eY7fnjKMT7faAMo7GKo6X0scqRA"
    }
  }
  ```

- **Error Response:**

  ```json
  "data": {
    "refreshAccessToken": {
      "message": "Invalid token",
      "code": 400,
      "data": null,
      "accessToken": null
    }
  }
  ```

- **Error Response:**

  ```json
  "data": {
    "refreshAccessToken": {
      "message": "Token has expired",
      "code": 401,
      "data": null,
      "accessToken": null
    }
  }
  ```
