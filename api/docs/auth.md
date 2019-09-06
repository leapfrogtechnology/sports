# Authentication

## Sign Up

### Request

```gql
mutation {
  signUp (email:"admin@sports.com", password:"admin@123") {
    message
  }
}
```

### Response

```JSON
{
  "data": {
    "signUp": {
      "message": "Success"
    }
  }
}
```

## Login

### Request

```gql
mutation {
  login (email: String!, password: String!) {
    refreshToken,
    accessToken
  }
}
```

### Response

```JSON
{
  "data": {
    "login": {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbXBsb3llZUlkIjowLCJ1c2VyUm9sZUlkIjozLCJwYXNzd29yZCI6IiQyYiQxMCQwNE9Ed2JXYTVST2VCNE5iYVZzdW5lTFgwQ1ZTWWwzTG01ejlwRVZkc0FmR3o5Mjg1ZlViLiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTE4VDEzOjI2OjM4LjU1MVoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA4LTE4VDEzOjI2OjM4LjU1MVoifSwiaXNSZWZyZXNoVG9rZW4iOnRydWUsImlhdCI6MTU2NjIxMTQ0NywiZXhwIjoxNTY2ODE2MjQ3fQ.AAQbV8EOH6n9s0A2Ln1V5DbNplUW9PfELzZ8gA5FTW8",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbXBsb3llZUlkIjowLCJ1c2VyUm9sZUlkIjozLCJwYXNzd29yZCI6IiQyYiQxMCQwNE9Ed2JXYTVST2VCNE5iYVZzdW5lTFgwQ1ZTWWwzTG01ejlwRVZkc0FmR3o5Mjg1ZlViLiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTE4VDEzOjI2OjM4LjU1MVoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA4LTE4VDEzOjI2OjM4LjU1MVoifSwiaWF0IjoxNTY2MjExNDQ3LCJleHAiOjE1NjYyMTUwNDd9.Ak22Odr0cLzU00nOd1iV7jD2a_Wo8n3-nRbICfRKVpg"
    }
  }
}
```

## Refresh Access Token

### Request

```gql
mutation {
  refreshAccessToken (refreshToken: String!) {
    message,
    accessToken
  }
}
```

#### Response

```JSON
{
  "data": {
    "refreshAccessToken": {
      "message": "Token created successfully",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJlbXBsb3llZUlkIjowLCJ1c2VyUm9sZUlkIjozLCJwYXNzd29yZCI6IiQyYiQxMCQwNE9Ed2JXYTVST2VCNE5iYVZzdW5lTFgwQ1ZTWWwzTG01ejlwRVZkc0FmR3o5Mjg1ZlViLiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTE4VDEzOjI2OjM4LjU1MVoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA4LTE4VDEzOjI2OjM4LjU1MVoifSwiaWF0IjoxNTY2MjE1MjQyLCJleHAiOjE1NjYyMTg4NDJ9.iIRftA3i2DeSeQtATLWyob8JrDMbIbIGHP57IA5dP2Y"
    }
  }
}
```
