# Tournaments

## List all

### Request

```gql
query {
  tournaments {
    id
    name
    season
    startDate
    finishDate
    registrationFormUrl
    game {
      id
      name
      shortName
    }
  }
}
```

### Response

```JSON
{
  "data": {
    "tournaments": [
      {
        "id": 4,
        "name": "Futsal League",
        "season": "2018",
        "startDate": "2018-11-12",
        "finishDate": "2018-12-02",
        "registrationFormUrl": null,
        "game": {
          "id": 16,
          "name": "Futsal",
          "shortName": "futsal"
        }
      },
      {
        "id": 5,
        "name": "CS Carnival",
        "season": "2019-q4",
        "startDate": "2019-08-12",
        "finishDate": "2019-09-12",
        "registrationFormUrl": null,
        "game": {
          "id": 12,
          "name": "Counter Strike",
          "shortName": "counter-strike"
        }
      }
    ]
  }
}
```

## Fetch one

### Request

```gql
query {
  tournament (id: Int!) {
    id
    name
    season
    startDate
    finishDate
    registrationFormUrl
    game {
      id
      name
      shortName
    }
  }
}
```

### Response

```JSON
{
  "data": {
    "tournament": {
      "id": 4,
      "name": "Futsal League",
      "season": "2018",
      "startDate": "2018-11-12",
      "finishDate": "2018-12-02",
      "registrationFormUrl": null,
      "game": {
        "id": 16,
        "name": "Futsal",
        "shortName": "futsal"
      }
    }
  }
}
```

## Create

### Request

```gql
mutation {
  createTournament (
    gameId: Int!,
    name: String!,
    season: String!,
    startDate: String!,
    finishDate: String,
    registrationFormUrl: String
  ) {
    id,
    name,
    season,
    startDate,
    finishDate,
    registrationFormUrl,
    game {
      id,
      name,
      shortName
    }
  }
}
```

### Response

```JSON
{
  "data": {
    "createTournament": {
      "id": 5,
      "name": "CS Carnival",
      "season": "2019-q4",
      "startDate": "2019-08-12",
      "finishDate": "2019-09-12",
      "registrationFormUrl": null,
      "game": {
        "id": 12,
        "name": "Counter Strike",
        "shortName": "counter-strike"
      }
    }
  }
}
```

## Edit

### Request

```gql
mutation {
  editTournament (
    id: Int!,
    gameId: Int!,
    name: String!,
    season: String!,
    startDate: String!,
    finishDate: String,
    registrationFormUrl: String
  ) {
    id,
    name,
    season,
    startDate,
    finishDate,
    registrationFormUrl,
    game {
      id,
      name,
      shortName
    }
  }
}
```

### Response

```JSON
{
  "data": {
    "editTournament": {
      "id": 5,
      "name": "CS Carnival",
      "season": "2019-q4",
      "startDate": "2019-08-12",
      "finishDate": "2019-09-12",
      "registrationFormUrl": null,
      "game": {
        "id": 12,
        "name": "Counter Strike",
        "shortName": "counter-strike"
      }
    }
  }
}
```

## Delete

### Request

```gql
mutation {
  deleteTournament (id: Int!) {
    message
  }
}
```

### Response

```JSON
{
  "data": {
    "deleteTournament": {
      "message": "Tournament successfully deleted"
    }
  }
}
```
