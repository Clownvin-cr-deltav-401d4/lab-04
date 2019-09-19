const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  })

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    expect(schema.fields).toBeTruthy();
    expect(schema.fields.id).toBeTruthy();
    expect(schema.fields.id.type).toBe('string');
    expect(schema.fields.id.required).toBeTruthy();
    expect(schema.fields.name).toBeTruthy();
    expect(schema.fields.name.type).toBe('string');
    expect(schema.fields.name.required).toBeTruthy();
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record.id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  //delete()
  it('can delete(id) a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(async(record) => {
        let fromDB = await categories.get(record.id);
        expect(fromDB.length).toEqual(1);
        fromDB = fromDB[0];
        expect(fromDB).toBeTruthy();
        expect(fromDB.id).toBeTruthy();
        return categories.delete(record.id)
          .then(async() => {
            let fromDB = await categories.get(record.id);
            expect(fromDB.length).toEqual(0);
          });
      });
  });

  //update()
  it('can update(id, entry) a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then((record) => {
        return categories.update(record.id, { name: 'Blah Blah Blah' })
          .then(async(record) => {
            let fromDB = await categories.get(record.id);
            expect(fromDB.length).toEqual(1);
            fromDB = fromDB[0];
            expect(fromDB.name).toEqual('Blah Blah Blah');
          });
      });
  });

});
