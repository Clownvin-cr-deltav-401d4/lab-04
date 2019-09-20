'use strict';

const DataModel = require('../memory.js');

class Categories extends DataModel {
  constructor() {
    super();
    this.schema.fields.name = { type: 'string', required: true };
  }
}

module.exports = Categories;
