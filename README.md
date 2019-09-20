# LAB - 4

## Data Models

### Author: Calvin Hall

### Links and Resources
* [submission PR](https://github.com/Clownvin-cr-deltav-401d4/lab-04/pull/1)
* [travis](https://www.travis-ci.com/Clownvin-cr-deltav-401d4/lab-04)

### Modules
#### `memory.js`
##### Exported Values and Methods
###### Exports Model class
* get(id) - Get the entry with the id.
* create(entry) - Create a new entry with the data passed in.
* update(id, entry) - Update entry with id to be the passed in entry.
* delete(id) - Delete entry matching id.
* sanitize(entry) - Check if an entry is valid, and return undefined if is not, otherwise return the entry.

#### `categories.js`
##### Extends Model class
Passes in schema with category name as string

#### `products.js`
##### Extends Model class
Passes in schema with category_id as string, price, weight, and stock as numbers

#### Running the app
* `npm test`
  
#### Tests
* `npm test`

#### UML
No
