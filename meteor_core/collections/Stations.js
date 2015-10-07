Stations = new Mongo.Collection("stations");

Tank = Astro.Class({
  name: 'Tanks',
  fields: {
    gasoline: 'string',
    number: 'array',
    capacity: 'number',
    minVolume: 'number',
    maxVolume: 'number'
  }
});

Station = Astro.Class({
  name: 'Station',
  collection: Stations,
  fields: {
    name: 'string',
    weakDays: 'array',
    strongDays: 'array',
    tanks: {
      type: 'array',
      nested: 'Tank'
    }
  },

  methods: {
    pendingMesaures: function() {
      return 1;
    }
  }
});
