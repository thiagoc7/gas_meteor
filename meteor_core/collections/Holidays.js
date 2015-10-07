Holidays = new Mongo.Collection("holidays");

Holiday = Astro.Class({
  name: 'Holiday',
  collection: Holidays,
  fields: {
    date: 'string',
    name: 'string'
  }
});