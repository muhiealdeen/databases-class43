## What columns violate 1NF?

- `food_code` and `food_description` they violate the atomic value rule
- `member_address` `dinner_id` `dinner_date` `venue_code` and `food_code` they violate the column domain rule

---

## What entities do you recognize that could be extracted?

we can identify the following entities that could be extracted:

- Member (member_id, member_name, member_address)
- Dinner (dinner_id, dinner_date)
- Venue (venue_code, venue_description)
- Food (food_code, food_description)

---

## Name all the tables and columns that would make a 3NF compliant solution

### Member table

- `member_id` (Primary Key)
- `member_name`
- `member_address`

### Dinner table

- `dinner_id` (Primary Key)
- `dinner_date`
- `venue_code` (Foreign Key referencing Venue table)

### Venue table

- `venue_code` (Primary Key)
- `venue_description`

### Food table

- `food_code` (Primary Key)
- `food_description`

### DinnerFood table (to resolve the many-to-many relationship between Dinner and Food)

- `dinner_id` (Foreign Key referencing Dinner table)
- `food_code` (Foreign Key referencing Food table)
