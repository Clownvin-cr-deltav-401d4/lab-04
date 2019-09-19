'use strict';

const uuid = require('uuid/v4');
const validator = require('./lib/validator');

class Model {

  constructor() {
    this.database = [];
    this.schema = {
      fields: {
        id: { type: 'string', required: true },
      }
    }
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    //console.log(`Returning ${response} for id ${id}`);
    return Promise.resolve(response);
  }

  create(entry) {
    entry.id = uuid();
    //console.log(`Creating entry with id ${entry.id}`);
    let record = this.sanitize(entry);
    console.log(entry, record);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  update(id, entry) {
    entry.id = id;
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  delete(id) {
    //console.log(`Deleting id ${id}`);
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  sanitize(entry) {
    return validator.isValid(this.schema, entry) ? entry : undefined;
  }

}

module.exports = Model;
