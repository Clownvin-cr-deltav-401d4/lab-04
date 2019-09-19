const Categories = require('../categories/categories.js');
const Products = require('../products/products.js');

function testModel(Model, createTestObj) {
  describe(`${Model.name} Model`, () => {
    let model;

    beforeEach(() => {
      model = new Model();
    });

    it('sanitize() returns undefined with missing requirements', () => {
      const schema = model.schema;
      //Test that schema.fields exists, and has at least the ID field set.
      expect(schema.fields).toBeTruthy();
      expect(schema.fields.id).toBeTruthy();
      expect(schema.fields.id.type).toBe('string');
      expect(schema.fields.id.required).toBeTruthy();

      var testRecord = {};
      for (var field in schema) {
        if (schema[field].required) {
          testRecord[field] = null;
        }
      }
      expect(model.sanitize(testRecord)).toBeUndefined();
    });

    it('can post() a new item', () => {
      let obj = createTestObj();
      console.log(Object.values(obj));
      return model.create(obj)
        .then(record => {
          console.log(obj, record);
          Object.keys(obj).forEach(key => {
            expect(record[key]).toEqual(obj[key]);
          });
        })
        .catch(e => console.error('ERR', e));
    });

    it('can get() an item', () => {
      let obj = createTestObj();
      return model.create(obj)
        .then(record => {
          return model.get(record.id)
            .then(category => {
              Object.keys(obj).forEach(key => {
                expect(category[0][key]).toEqual(obj[key]);
              });
            });
        });
    });

    //delete()
    it('can delete(id) an item', () => {
      let obj = createTestObj();
      return model.create(obj)
        .then(async(record) => {
          let fromDB = await model.get(record.id);
          expect(fromDB.length).toEqual(1);
          fromDB = fromDB[0];
          expect(fromDB).toBeTruthy();
          expect(fromDB.id).toBeTruthy();
          return model.delete(record.id)
            .then(async() => {
              let fromDB = await model.get(record.id);
              expect(fromDB.length).toEqual(0);
            });
        });
    });

    //update()
    it('can update(id, entry) an item', () => {
      let obj = createTestObj();
      return model.create(obj)
        .then((record) => {
          return model.update(record.id, { ...record, test: 'Is test' })
            .then(async(record) => {
              let fromDB = await model.get(record.id);
              expect(fromDB.length).toEqual(1);
              fromDB = fromDB[0];
              expect(fromDB.test).toEqual('Is test');
            });
        });
    });
  });
}

testModel(Categories, () => ({ name: 'Test Category' }));
testModel(Products, () => ({ category_id: 'pure gold', price: 1000000, quantity_in_stock: 123 }));
