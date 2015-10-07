Trucks = new Mongo.Collection("trucks");

Truck = Astro.Class({
  name: 'Truck',
  collection: Trucks,
  fields: {
    name: 'string',
    capacity: 'number',
    tanks: {
      type: 'array',
      nested: 'number',
      default: function() {
        return [];
      }
    },
    active: {
      type: 'boolean',
      default: true
    }
  },

  events: {
    beforeSave: function() {
      let total = 0;
      this.tanks.map(tank => total += tank);
      const name = total + " lts (" + this.tanks.toString() + ")";
      this.set('name', name);
      this.set('capacity', total);
    }
  }
});