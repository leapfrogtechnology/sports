# Games

## List all

### Request

```gql
query {
  games {
    id,
    name,
    shortName
  }
}
```

### Response

```JSON
{
  "data": {
    "games": [
      {
        "id": 15,
        "name": "Carrom",
        "shortName": "carrom"
      },
      {
        "id": 16,
        "name": "Futsal",
        "shortName": "futsal"
      }
    ]
  }
}
```

## Create

### Request

```gql
mutation {
  createGame (name: String!, shortName: String!) {
    id,
    name,
    shortName
  }
}
```

### Response

```JSON
{
  "data": {
    "createGame": {
      "id": 15,
      "name": "Carrom",
      "shortName": "carrom"
    }
  }
}
```

## Edit

### Request

```gql
mutation {
  editGame (id: Int!, name: String!, shortName: String!) {
    id,
    name,
    shortName
  }
}
```

### Response

```JSON
{
  "data": {
    "editGame": {
      "id": 15,
      "name": "Carrom",
      "shortName": "carrom"
    }
  }
}
```

## Delete

### Request

```gql
mutation {
  deleteGame (id: Int!) {
    message
  }
}
```

### Response

```JSON
{
  "data": {
    "deleteGame": {
      "message": "Game successfully deleted"
    }
  }
}
```
