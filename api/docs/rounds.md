# Categories

## List all

### Request

```gql
query {
  rounds {
    id,
    name,
    shortName,
    sortOrder
  }
}
```

### Response

```JSON
{
  "data": {
    "rounds": [
      {
        "id": 2,
        "name": "Quarter Finals",
        "shortName": "QF",
        "sortOrder": 3
      },
      {
        "id": 3,
        "name": "Semi Final",
        "shortName": "SF",
        "sortOrder": 2
      }
    ]
  }
}
```

## Create

### Request

```gql
mutation {
  createRound (name: String!, shortName: String!, sortOrder: Int!) {
    id,
    name,
    shortName,
    sortOrder
  }
}
```

### Response

```JSON
{
  "data": {
    "createRound": {
      "id": 3,
      "name": "Semi Final",
      "shortName": "SF",
      "sortOrder": 2
    }
  }
}
```

## Edit

### Request

```gql
mutation {
  editRound (id: Int!, name: String!, shortName: String!, sortOrder: Int!) {
    id,
    name,
    shortName,
    sortOrder
  }
}
```

### Response

```JSON
{
  "data": {
    "editRound": {
      "id": 2,
      "name": "Quarter Finals",
      "shortName": "QF",
      "sortOrder": 3
    }
  }
}
```

## Delete

### Request

```gql
mutation {
  deleteRound (id: Int!) {
    message
  }
}
```

### Response

```JSON
{
  "data": {
    "deleteRound": {
      "message": "Round successfully deleted"
    }
  }
}
```
