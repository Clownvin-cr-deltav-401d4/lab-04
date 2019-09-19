'use strict';
/*
category_id - string, required
price - number, required
weight - number
quantity_in_stock - number, required
*/

const DataModel = require('../memory.js');

class Products extends DataModel {
  constructor() {
    super();
    this.schema.fields.category_id = { type: 'string', required: true };
    this.schema.fields.price = { type: 'number', required: true };
    this.schema.fields.weight = { type: 'number', required: false };
    this.schema.fields.quantity_in_stock = { type: 'number', required: true };
  }
}

module.exports = Products;
