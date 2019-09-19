'use strict';

const uuid = require('uuid/v4');

class Model {

  constructor() {
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    console.log(`Returning ${response} for id ${id}`);
    return Promise.resolve(response);
  }

  create(entry) {
    entry.id = uuid();
    console.log(`Creating entry with id ${entry.id}`);
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  delete(id) {
    console.log(`Deleting id ${id}`);
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      console.log(field);
      if (this.schema[field].required) {
        console.log('Is required, and entry[field] is', entry[field])
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

}

module.exports = Model;