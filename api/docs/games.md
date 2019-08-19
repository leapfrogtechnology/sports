# Games

## List all games

### Request

```JSON
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

## Create a new game

### Request

```JSON
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
