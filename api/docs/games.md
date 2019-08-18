# Games

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
