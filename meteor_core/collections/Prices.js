Prices = new Mongo.Collection("prices");

Price = Astro.Class({
  name: 'Price',
  collection: Prices,
  fields: {
    supplier: 'string',
    gasoline: 'string',
    price: 'string'
  }
});