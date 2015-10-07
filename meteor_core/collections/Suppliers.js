Suppliers = new Mongo.Collection("suppliers");

Supplier = Astro.Class({
  name: 'Supplier',
  collection: Suppliers,
  fields: {
    name: 'string',
    contact: 'string',
    emails: {
      type: 'array',
      nested: 'string',
      default: function() {
        return [];
      }
    },
    phones: {
      type: 'array',
      nested: 'string',
      default: function() {
        return [];
      }
    }
  }
});