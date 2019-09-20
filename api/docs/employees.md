# Employees

## Sync

### Request

```gql
mutation {
  syncEmployees {
    count {
      new
      updated
    }
  }
}
```

### Response

```JSON
{
  "data": {
    "syncEmployees": {
        "count": {
          "new": 10,
          "updated": 20
        }
      }
  }
}
```

## Fetch all

### Request

```gql
query {
  employees {
    id,
    email,
    firstName,
    middleName,
    lastName,
    profilePictureUrl,
    emsEmployeeId,
    status
  }
}
```

### Response

```JSON
{
  "data": {
    "employees": [
      {
        "id": 1,
        "email": "admin@sports.com",
        "firstName": "Super",
        "middleName": "",
        "lastName": "Admin",
        "profilePictureUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0_Qz2-8hIlvDVr9OoIIPLQEr1KnjOzKUjqv7yltpVw4CpqvB_",
        "emsEmployeeId": 0,
        "status": "Permanent"
      },
      {
        "id": 2,
        "email": "admin2@sports.com",
        "firstName": "Super99",
        "middleName": null,
        "lastName": "Admin2",
        "profilePictureUrl": "https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg",
        "emsEmployeeId": 99,
        "status": "Permanent"
      }
    ]
  }
}
```

## Fetch one

### Request

```gql
query {
  employee (id: Int!) {
    id,
    email,
    firstName,
    middleName,
    lastName,
    profilePictureUrl,
    emsEmployeeId,
    status
  }
}
```

### Response

```JSON
{
  "data": {
    "employee": {
      "id": 1,
      "email": "admin@sports.com",
      "firstName": "Super",
      "middleName": "",
      "lastName": "Admin",
      "profilePictureUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0_Qz2-8hIlvDVr9OoIIPLQEr1KnjOzKUjqv7yltpVw4CpqvB_",
      "emsEmployeeId": 0,
      "status": "Permanent"
    }
  }
}
```
