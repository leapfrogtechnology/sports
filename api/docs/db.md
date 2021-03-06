- [List of tables](#list-of-tables)
  - [Tables](#tables)
    - [employees](#employees)
    - [user_roles](#user_roles)
    - [user_accounts](#user_accounts)
    - [user_account_tokens](#user_account_tokens)
    - [games](#games)
    - [tournaments](#tournaments)
    - [categories](#categories)
    - [tournament_types](#tournament_types)
    - [sub_tournaments](#sub_tournaments)
    - [sub_tournament_images](#sub_tournament_images)
    - [sub_tournament_players](#sub_tournament_players)
    - [sub_tournament_groups](#sub_tournament_groups)
    - [teams](#teams)
    - [team_players](#team_players)
    - [statuses](#statuses)
    - [rounds](#rounds)
    - [fixtures](#fixtures)
    - [football_scores](#football_scores)
    - [football_activity_types](#football_activity_types)
    - [football_score_activities](#football_score_activities)
    - [chess_winning_methods](#chess_winning_methods)
    - [chess_scores](#chess_scores)
    - [carrom_board_scores](#carrom_board_scores)
    - [carrom_board_score_activities](#carrom_board_score_activities)
    - [table_tennis_scores](#table_tennis_scores)
    - [table_tennis_score_activities](#table_tennis_score_activities)
    - [counter_strike_scores](#counter_strike_scores)
    - [counter_strike_score_sets](#counter_strike_score_sets)
    - [counter_strike_score_set_activities](#counter_strike_score_set_activities)
    - [dota_scores](#dota_scores)
    - [dota_score_activities](#dota_score_activities)

# List of tables

## Tables

### employees

| Column              | Type                     | Collation | Nullable | Default                               |
| ------------------- | ------------------------ | --------- | -------- | ------------------------------------- |
| id                  | integer                  |           | not null | nextval('employees_id_seq'::regclass) |
| first_name          | character varying(255)   |           | not null |                                       |
| middle_name         | character varying(255)   |           |          |                                       |
| last_name           | character varying(255)   |           | not null |                                       |
| email               | character varying(255)   |           | not null |                                       |
| profile_picture_url | character varying(255)   |           |          |                                       |
| ems_employee_id     | integer                  |           | not null |                                       |
| status              | character varying(255)   |           | not null |                                       |
| created_at          | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                     |
| updated_at          | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                     |

Indexes:

- "employees_pkey" PRIMARY KEY, btree (id)
- "employees_email_unique" UNIQUE CONSTRAINT, btree (email)

### user_roles

| Column     | Type                     | Collation | Nullable | Default                                |
| ---------- | ------------------------ | --------- | -------- | -------------------------------------- |
| id         | integer                  |           | not null | nextval('user_roles_id_seq'::regclass) |
| name       | character varying(255)   |           | not null |                                        |
| created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                      |
| updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                      |

Indexes:

- "user_roles_pkey" PRIMARY KEY, btree (id)

### user_accounts

| Column       | Type                     | Collation | Nullable | Default                                   |
| ------------ | ------------------------ | --------- | -------- | ----------------------------------------- |
| id           | integer                  |           | not null | nextval('user_accounts_id_seq'::regclass) |
| employee_id  | integer                  |           | not null |                                           |
| user_role_id | integer                  |           |          |                                           |
| password     | character varying(255)   |           | not null |                                           |
| is_active    | boolean                  |           | not null | false                                     |
| created_at   | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                         |
| updated_at   | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                         |

Indexes:

- "user_accounts_pkey" PRIMARY KEY, btree (id)
- "user_accounts_employee_id_unique" UNIQUE CONSTRAINT, btree (employee_id)

Foreign-key constraints:

- "user_accounts_user_role_id_foreign" FOREIGN KEY (user_role_id) REFERENCES user_roles(id)

### user_account_tokens

| Column          | Type                     | Collation | Nullable | Default                                         |
| --------------- | ------------------------ | --------- | -------- | ----------------------------------------------- |
| id              | integer                  |           | not null | nextval('user_account_tokens_id_seq'::regclass) |
| user_account_id | integer                  |           | not null |                                                 |
| refresh_token   | text                     |           | not null |                                                 |
| created_at      | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                               |
| updated_at      | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                               |

Indexes:

- "user_account_tokens_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "user_account_tokens_user_account_id_foreign" FOREIGN KEY (user_account_id) REFERENCES user_accounts(id)

### games

| Column     | Type                     | Collation | Nullable | Default                           |
| ---------- | ------------------------ | --------- | -------- | --------------------------------- |
| id         | integer                  |           | not null | nextval('games_id_seq'::regclass) |
| name       | character varying(255)   |           | not null |                                   |
| short_name | character varying(255)   |           | not null |                                   |
| updated_by | integer                  |           | not null |                                   |
| created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                 |
| updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                 |

Indexes:

- "games_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "games_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### tournaments

| Column                | Type                     | Collation | Nullable | Default                                 |
| --------------------- | ------------------------ | --------- | -------- | --------------------------------------- |
| id                    | integer                  |           | not null | nextval('tournaments_id_seq'::regclass) |
| game_id               | integer                  |           | not null |                                         |
| season                | character varying(255)   |           | not null |                                         |
| name                  | character varying(255)   |           |          |                                         |
| start_date            | timestamp with time zone |           |          |                                         |
| finish_date           | timestamp with time zone |           |          |                                         |
| registration_form_url | text                     |           |          |                                         |
| updated_by            | integer                  |           | not null |                                         |
| created_at            | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                       |
| updated_at            | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                       |

Indexes:

- "tournaments_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "tournaments_game_id_foreign" FOREIGN KEY (game_id) REFERENCES games(id)
- "tournaments_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### categories

| Column     | Type                     | Collation | Nullable | Default                                |
| ---------- | ------------------------ | --------- | -------- | -------------------------------------- |
| id         | integer                  |           | not null | nextval('categories_id_seq'::regclass) |
| name       | character varying(255)   |           | not null |                                        |
| updated_by | integer                  |           | not null |                                        |
| created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                      |
| updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                      |

Indexes:

- "categories_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "categories_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### tournament_types

| Column     | Type                     | Collation | Nullable | Default                                      |
| ---------- | ------------------------ | --------- | -------- | -------------------------------------------- |
| id         | integer                  |           | not null | nextval('tournament_types_id_seq'::regclass) |
| name       | character varying(255)   |           | not null |                                              |
| created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                            |
| updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                            |

Indexes:

- "tournament_types_pkey" PRIMARY KEY, btree (id)

### sub_tournaments

| Column             | Type                     | Collation | Nullable | Default                                     |
| ------------------ | ------------------------ | --------- | -------- | ------------------------------------------- |
| id                 | integer                  |           | not null | nextval('sub_tournaments_id_seq'::regclass) |
| tournament_id      | integer                  |           | not null |                                             |
| category_id        | integer                  |           | not null |                                             |
| tournament_type_id | integer                  |           | not null |                                             |
| updated_by         | integer                  |           | not null |                                             |
| created_at         | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                           |
| updated_at         | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                           |

Indexes:

- "sub_tournaments_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "sub_tournaments_category_id_foreign" FOREIGN KEY (category_id) REFERENCES categories(id)
- "sub_tournaments_tournament_id_foreign" FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
- "sub_tournaments_tournament_type_id_foreign" FOREIGN KEY (tournament_type_id) REFERENCES tournament_types(id)
- "sub_tournaments_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### sub_tournament_images

| Column            | Type                     | Collation | Nullable | Default                                           |
| ----------------- | ------------------------ | --------- | -------- | ------------------------------------------------- |
| id                | integer                  |           | not null | nextval('sub_tournament_images_id_seq'::regclass) |
| sub_tournament_id | integer                  |           | not null |                                                   |
| image             | integer                  |           | not null |                                                   |
| is_cover          | boolean                  |           |          | false                                             |
| updated_by        | integer                  |           | not null |                                                   |
| created_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |
| updated_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |

Indexes:

- "sub_tournament_images_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "sub_tournament_images_sub_tournament_id_foreign" FOREIGN KEY (sub_tournament_id) REFERENCES tournaments(id)
- "sub_tournament_images_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### sub_tournament_players

| Column            | Type                     | Collation | Nullable | Default                                            |
| ----------------- | ------------------------ | --------- | -------- | -------------------------------------------------- |
| id                | integer                  |           | not null | nextval('sub_tournament_players_id_seq'::regclass) |
| sub_tournament_id | integer                  |           | not null |                                                    |
| employee_id       | integer                  |           | not null |                                                    |
| positions         | character varying(255)   |           |          |                                                    |
| updated_by        | integer                  |           | not null |                                                    |
| created_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                  |
| updated_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                  |

Indexes:

- "sub_tournament_players_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "sub_tournament_players_employee_id_foreign" FOREIGN KEY (employee_id) REFERENCES employees(id)
- "sub_tournament_players_sub_tournament_id_foreign" FOREIGN KEY (sub_tournament_id) REFERENCES sub_tournaments(id)
- "sub_tournament_players_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### sub_tournament_groups

| Column            | Type                     | Collation | Nullable | Default                                           |
| ----------------- | ------------------------ | --------- | -------- | ------------------------------------------------- |
| id                | integer                  |           | not null | nextval('sub_tournament_groups_id_seq'::regclass) |
| sub_tournament_id | integer                  |           | not null |                                                   |
| name              | integer                  |           | not null |                                                   |
| updated_by        | integer                  |           | not null |                                                   |
| created_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |
| updated_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |

Indexes:

- "sub_tournament_groups_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "sub_tournament_groups_sub_tournament_id_foreign" FOREIGN KEY (sub_tournament_id) REFERENCES sub_tournaments(id)
- "sub_tournament_groups_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### teams

| Column                  | Type                     | Collation | Nullable | Default                           |
| ----------------------- | ------------------------ | --------- | -------- | --------------------------------- |
| id                      | integer                  |           | not null | nextval('teams_id_seq'::regclass) |
| name                    | character varying(255)   |           | not null |                                   |
| logo                    | text                     |           |          |                                   |
| sub_tournament_id       | integer                  |           | not null |                                   |
| sub_tournament_group_id | integer                  |           |          |                                   |
| updated_by              | integer                  |           | not null |                                   |
| created_at              | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                 |
| updated_at              | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                 |

Indexes:

- "teams_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "teams_sub_tournament_group_id_foreign" FOREIGN KEY (sub_tournament_group_id) REFERENCES sub_tournament_groups(id)
- "teams_sub_tournament_id_foreign" FOREIGN KEY (sub_tournament_id) REFERENCES sub_tournaments(id)
- "teams_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### team_players

| Column     | Type                     | Collation | Nullable | Default                                  |
| ---------- | ------------------------ | --------- | -------- | ---------------------------------------- |
| id         | integer                  |           | not null | nextval('team_players_id_seq'::regclass) |
| team_id    | integer                  |           | not null |                                          |
| player_id  | integer                  |           | not null |                                          |
| is_captain | boolean                  |           | not null | false                                    |
| updated_by | integer                  |           | not null |                                          |
| created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                        |
| updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                        |

Indexes:

- "team_players_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "team_players_player_id_foreign" FOREIGN KEY (player_id) REFERENCES sub_tournament_players(id)
- "team_players_team_id_foreign" FOREIGN KEY (team_id) REFERENCES teams(id)
- "team_players_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### statuses

| Column     | Type                     | Collation | Nullable | Default                              |
| ---------- | ------------------------ | --------- | -------- | ------------------------------------ |
| id         | integer                  |           | not null | nextval('statuses_id_seq'::regclass) |
| name       | character varying(255)   |           | not null |                                      |
| updated_by | integer                  |           | not null |                                      |
| created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                    |
| updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                    |

Indexes:

- "statuses_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "statuses_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### rounds

| Column     | Type                     | Collation | Nullable | Default                            |
| ---------- | ------------------------ | --------- | -------- | ---------------------------------- |
| id         | integer                  |           | not null | nextval('rounds_id_seq'::regclass) |
| name       | character varying(255)   |           | not null |                                    |
| short_name | character varying(255)   |           | not null |                                    |
| sort_order | integer                  |           | not null |                                    |
| updated_by | integer                  |           | not null |                                    |
| created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                  |
| updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                  |

Indexes:

- "rounds_pkey" PRIMARY KEY, btree (id)
- "rounds_sort_order_unique" UNIQUE CONSTRAINT, btree (sort_order)

Foreign-key constraints:

- "rounds_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### fixtures

| Column                      | Type                     | Collation | Nullable | Default                              |
| --------------------------- | ------------------------ | --------- | -------- | ------------------------------------ |
| id                          | integer                  |           | not null | nextval('fixtures_id_seq'::regclass) |
| sub_tournament_id           | integer                  |           | not null |                                      |
| status_id                   | integer                  |           | not null |                                      |
| event_date                  | timestamp with time zone |           |          |                                      |
| home_team_id                | integer                  |           | not null |                                      |
| away_team_id                | integer                  |           | not null |                                      |
| round_id                    | integer                  |           | not null |                                      |
| home_team_parent_fixture_id | integer                  |           |          |                                      |
| away_team_parent_fixture_id | integer                  |           |          |                                      |
| updated_by                  | integer                  |           | not null |                                      |
| created_at                  | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                    |
| updated_at                  | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                    |

Indexes:

- "fixtures_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "fixtures_away_team_id_foreign" FOREIGN KEY (away_team_id) REFERENCES teams(id)
- "fixtures_away_team_parent_fixture_id_foreign" FOREIGN KEY (away_team_parent_fixture_id) REFERENCES fixtures(id)
- "fixtures_home_team_id_foreign" FOREIGN KEY (home_team_id) REFERENCES teams(id)
- "fixtures_home_team_parent_fixture_id_foreign" FOREIGN KEY (home_team_parent_fixture_id) REFERENCES fixtures(id)
- "fixtures_round_id_foreign" FOREIGN KEY (round_id) REFERENCES rounds(id)
- "fixtures_status_id_foreign" FOREIGN KEY (status_id) REFERENCES statuses(id)
- "fixtures_sub_tournament_id_foreign" FOREIGN KEY (sub_tournament_id) REFERENCES sub_tournaments(id)
- "fixtures_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### football_scores

| Column                  | Type                     | Collation | Nullable | Default                                     |
| ----------------------- | ------------------------ | --------- | -------- | ------------------------------------------- |
| id                      | integer                  |           | not null | nextval('football_scores_id_seq'::regclass) |
| fixture_id              | integer                  |           | not null |                                             |
| home_team_ht_score      | integer                  |           |          |                                             |
| away_team_ht_score      | integer                  |           |          |                                             |
| home_team_ft_score      | integer                  |           |          |                                             |
| away_team_ft_score      | integer                  |           |          |                                             |
| home_team_aet_score     | integer                  |           |          |                                             |
| away_team_aet_score     | integer                  |           |          |                                             |
| home_team_penalty_score | integer                  |           |          |                                             |
| away_team_penalty_score | integer                  |           |          |                                             |
| updated_by              | integer                  |           | not null |                                             |
| created_at              | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                           |
| updated_at              | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                           |

Indexes:

- "football_scores_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "football_scores_fixture_id_foreign" FOREIGN KEY (fixture_id) REFERENCES fixtures(id)
- "football_scores_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### football_activity_types

| Column     | Type                     | Collation | Nullable | Default                                             |
| ---------- | ------------------------ | --------- | -------- | --------------------------------------------------- |
| id         | integer                  |           | not null | nextval('football_activity_types_id_seq'::regclass) |
| name       | character varying(255)   |           | not null |                                                     |
| created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                   |
| updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                   |

Indexes:

- "football_activity_types_pkey" PRIMARY KEY, btree (id)

### football_score_activities

| Column            | Type                     | Collation | Nullable | Default                                               |
| ----------------- | ------------------------ | --------- | -------- | ----------------------------------------------------- |
| id                | integer                  |           | not null | nextval('football_score_activities_id_seq'::regclass) |
| football_score_id | integer                  |           | not null |                                                       |
| team_player_id    | integer                  |           | not null |                                                       |
| activity_type_id  | integer                  |           | not null |                                                       |
| assisted_by       | integer                  |           |          |                                                       |
| activity_time     | character varying(255)   |           |          |                                                       |
| updated_by        | integer                  |           | not null |                                                       |
| created_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                     |
| updated_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                     |

Indexes:

- "football_score_activities_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "football_score_activities_activity_type_id_foreign" FOREIGN KEY (activity_type_id) REFERENCES football_activity_types(id)
- "football_score_activities_assisted_by_foreign" FOREIGN KEY (assisted_by) REFERENCES team_players(id)
- "football_score_activities_football_score_id_foreign" FOREIGN KEY (football_score_id) REFERENCES football_scores(id)
- "football_score_activities_team_player_id_foreign" FOREIGN KEY (team_player_id) REFERENCES team_players(id)
- "football_score_activities_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### chess_winning_methods

| Column     | Type                     | Collation | Nullable | Default                                           |
| ---------- | ------------------------ | --------- | -------- | ------------------------------------------------- |
| id         | integer                  |           | not null | nextval('chess_winning_methods_id_seq'::regclass) |
| name       | character varying(255)   |           | not null |                                                   |
| created_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |
| updated_at | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |

Indexes:

- "chess_winning_methods_pkey" PRIMARY KEY, btree (id)

### chess_scores

| Column            | Type                     | Collation | Nullable | Default                                  |
| ----------------- | ------------------------ | --------- | -------- | ---------------------------------------- |
| id                | integer                  |           | not null | nextval('chess_scores_id_seq'::regclass) |
| fixture_id        | integer                  |           | not null |                                          |
| winner_team_id    | integer                  |           | not null |                                          |
| winning_method_id | integer                  |           | not null |                                          |
| updated_by        | integer                  |           | not null |                                          |
| created_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                        |
| updated_at        | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                        |

Indexes:

- "chess_scores_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "chess_scores_fixture_id_foreign" FOREIGN KEY (fixture_id) REFERENCES fixtures(id)
- "chess_scores_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)
- "chess_scores_winner_team_id_foreign" FOREIGN KEY (winner_team_id) REFERENCES teams(id)
- "chess_scores_winning_method_id_foreign" FOREIGN KEY (winning_method_id) REFERENCES chess_winning_methods(id)

### carrom_board_scores

| Column          | Type                     | Collation | Nullable | Default                                         |
| --------------- | ------------------------ | --------- | -------- | ----------------------------------------------- |
| id              | integer                  |           | not null | nextval('carrom_board_scores_id_seq'::regclass) |
| fixture_id      | integer                  |           | not null |                                                 |
| home_team_score | integer                  |           | not null |                                                 |
| away_team_score | integer                  |           | not null |                                                 |
| updated_by      | integer                  |           | not null |                                                 |
| created_at      | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                               |
| updated_at      | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                               |

Indexes:

- "carrom_board_scores_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "carrom_board_scores_fixture_id_foreign" FOREIGN KEY (fixture_id) REFERENCES fixtures(id)
- "carrom_board_scores_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### carrom_board_score_activities

| Column                | Type                     | Collation | Nullable | Default                                                   |
| --------------------- | ------------------------ | --------- | -------- | --------------------------------------------------------- |
| id                    | integer                  |           | not null | nextval('carrom_board_score_activities_id_seq'::regclass) |
| carrom_board_score_id | integer                  |           | not null |                                                           |
| team                  | integer                  |           | not null |                                                           |
| set                   | integer                  |           | not null |                                                           |
| points                | integer                  |           | not null |                                                           |
| updated_by            | integer                  |           | not null |                                                           |
| created_at            | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                         |
| updated_at            | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                         |

Indexes:

- "carrom_board_score_activities_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "carrom_board_score_activities_carrom_board_score_id_foreign" FOREIGN KEY (carrom_board_score_id) REFERENCES carrom_board_scores(id)
- "carrom_board_score_activities_team_foreign" FOREIGN KEY (team) REFERENCES teams(id)
- "carrom_board_score_activities_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### table_tennis_scores

| Column          | Type                     | Collation | Nullable | Default                                         |
| --------------- | ------------------------ | --------- | -------- | ----------------------------------------------- |
| id              | integer                  |           | not null | nextval('table_tennis_scores_id_seq'::regclass) |
| fixture_id      | integer                  |           | not null |                                                 |
| home_team_score | integer                  |           | not null |                                                 |
| away_team_score | integer                  |           | not null |                                                 |
| sets_count      | integer                  |           | not null |                                                 |
| updated_by      | integer                  |           | not null |                                                 |
| created_at      | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                               |
| updated_at      | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                               |

Indexes:

- "table_tennis_scores_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "table_tennis_scores_fixture_id_foreign" FOREIGN KEY (fixture_id) REFERENCES fixtures(id)
- "table_tennis_scores_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### table_tennis_score_activities

| Column                | Type                     | Collation | Nullable | Default                                                   |
| --------------------- | ------------------------ | --------- | -------- | --------------------------------------------------------- |
| id                    | integer                  |           | not null | nextval('table_tennis_score_activities_id_seq'::regclass) |
| table_tennis_score_id | integer                  |           | not null |                                                           |
| set                   | integer                  |           | not null |                                                           |
| home_team_points      | integer                  |           | not null |                                                           |
| away_team_points      | integer                  |           | not null |                                                           |
| updated_by            | integer                  |           | not null |                                                           |
| created_at            | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                         |
| updated_at            | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                         |

Indexes:

- "table_tennis_score_activities_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "table_tennis_score_activities_fixture_id_foreign" FOREIGN KEY (fixture_id) REFERENCES fixtures(id)
- "table_tennis_score_activities_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### counter_strike_scores

| Column          | Type                     | Collation | Nullable | Default                                           |
| --------------- | ------------------------ | --------- | -------- | ------------------------------------------------- |
| id              | integer                  |           | not null | nextval('counter_strike_scores_id_seq'::regclass) |
| fixture_id      | integer                  |           | not null |                                                   |
| home_team_score | integer                  |           | not null |                                                   |
| away_team_score | integer                  |           | not null |                                                   |
| sets_count      | integer                  |           | not null |                                                   |
| updated_by      | integer                  |           | not null |                                                   |
| created_at      | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |
| updated_at      | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |

Indexes:

- "counter_strike_scores_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "counter_strike_scores_fixture_id_foreign" FOREIGN KEY (fixture_id) REFERENCES fixtures(id)
- "counter_strike_scores_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### counter_strike_score_sets

| Column                  | Type                     | Collation | Nullable | Default                                               |
| ----------------------- | ------------------------ | --------- | -------- | ----------------------------------------------------- |
| id                      | integer                  |           | not null | nextval('counter_strike_score_sets_id_seq'::regclass) |
| counter_strike_score_id | integer                  |           | not null |                                                       |
| set                     | integer                  |           | not null |                                                       |
| home_team_score         | integer                  |           | not null |                                                       |
| away_team_score         | integer                  |           | not null |                                                       |
| updated_by              | integer                  |           | not null |                                                       |
| created_at              | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                     |
| updated_at              | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                     |

Indexes:

- "counter_strike_score_sets_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "counter_strike_score_sets_counter_strike_score_id_foreign" FOREIGN KEY (counter_strike_score_id) REFERENCES counter_strike_scores(id)
- "counter_strike_score_sets_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### counter_strike_score_set_activities

| Column                      | Type                     | Collation | Nullable | Default                                                         |
| --------------------------- | ------------------------ | --------- | -------- | --------------------------------------------------------------- |
| id                          | integer                  |           | not null | nextval('counter_strike_score_set_activities_id_seq'::regclass) |
| counter_strike_score_set_id | integer                  |           | not null |                                                                 |
| team_player_id              | integer                  |           | not null |                                                                 |
| kills                       | integer                  |           | not null |                                                                 |
| deaths                      | integer                  |           | not null |                                                                 |
| assists                     | integer                  |           | not null |                                                                 |
| updated_by                  | integer                  |           | not null |                                                                 |
| created_at                  | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                               |
| updated_at                  | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                               |

Indexes:

- "counter_strike_score_set_activities_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "counter_strike_score_set_activities_counter_strike_score_set_id" FOREIGN KEY (counter_strike_score_set_id) REFERENCES counter_strike_score_sets(id)
- "counter_strike_score_set_activities_team_player_id_foreign" FOREIGN KEY (team_player_id) REFERENCES team_players(id)
- "counter_strike_score_set_activities_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)

### dota_scores

| Column         | Type                     | Collation | Nullable | Default                                 |
| -------------- | ------------------------ | --------- | -------- | --------------------------------------- |
| id             | integer                  |           | not null | nextval('dota_scores_id_seq'::regclass) |
| fixture_id     | integer                  |           | not null |                                         |
| sets_count     | integer                  |           | not null |                                         |
| winner_team_id | integer                  |           | not null |                                         |
| updated_by     | integer                  |           | not null |                                         |
| created_at     | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                       |
| updated_at     | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                       |

Indexes:

- "dota_scores_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "dota_scores_fixture_id_foreign" FOREIGN KEY (fixture_id) REFERENCES fixtures(id)
- "dota_scores_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)
- "dota_scores_winner_team_foreign" FOREIGN KEY (winner_team_id) REFERENCES teams(id)

### dota_score_activities

| Column         | Type                     | Collation | Nullable | Default                                           |
| -------------- | ------------------------ | --------- | -------- | ------------------------------------------------- |
| id             | integer                  |           | not null | nextval('dota_score_activities_id_seq'::regclass) |
| dota_score_id  | integer                  |           | not null |                                                   |
| set            | integer                  |           | not null |                                                   |
| winner_team_id | integer                  |           | not null |                                                   |
| updated_by     | integer                  |           | not null |                                                   |
| created_at     | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |
| updated_at     | timestamp with time zone |           | not null | CURRENT_TIMESTAMP                                 |

Indexes:

- "dota_score_activities_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:

- "dota_score_activities_dota_score_id_foreign" FOREIGN KEY (dota_score_id) REFERENCES dota_scores(id)
- "dota_score_activities_updated_by_foreign" FOREIGN KEY (updated_by) REFERENCES user_accounts(id)
- "dota_score_activities_winner_team_id_foreign" FOREIGN KEY (winner_team_id) REFERENCES teams(id)
