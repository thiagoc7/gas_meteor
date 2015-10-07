Plans = new Mongo.Collection("plans");

Plan = Astro.Class({
  name: 'Plan',
  collection: Plans,

  fields: {
    date: 'string',
    station: 'string',
    weekDay: {
      type: 'number',
      default: function() {
        return parseInt(moment(this.date).day());
      }
    },
    holiday: 'string',
    dayType: 'string',
    tank: {
      type: 'object',
      nested: 'Tank'
    },
    beginVolume: {
      type: 'number',
      default: 0
    },
    beginVolumeReal: {
      type: 'boolean',
      default: false
    },
    buy: {
      type: 'number',
      default: 0
    },
    finalVolumeReal: 'number',
    finalVolume: 'number',
    sellForecast: {
      type: 'number',
      default: 0
    },
    sell: {
      type: 'number',
      default: 0
    },
    minBuy: {
      type: 'number',
      default: 0
    },
    maxBuy: {
      type: 'number',
      default: 0
    }
  },

  events: {
    beforeInsert: function() {
      //set holiday
      var holiday = Holidays.findOne({date: this.date});
      if (holiday) { this.set('holiday', holiday.name); }

      // set dayType
      var station = Stations.findOne({name: this.station});
      var day = parseInt(moment(this.date).format("D"));
      if (station.weakDays && (station.weakDays.indexOf(day) > -1)) {
        this.set('dayType', 'dia fraco');
      } else if (station.strongDays && (station.strongDays.indexOf(day) > -1)) {
        this.set('dayType', 'dia forte');
      }

      // set begin volume
      var previousDate = moment(this.date).subtract(1, 'day').format('YYYY-MM-DD');
      var previousPlan = Plans.findOne({date: previousDate, station: this.station, "tank.gasoline": this.tank.gasoline});
      if (previousDate && previousPlan) {
        this.set('beginVolume', previousPlan.finalVolume);
        if (previousPlan.finalVolumeReal) {this.set('beginVolumeReal', true)}
      }

      // set finalVolume, sell
      if (this.finalVolumeReal) {
        this.set('finalVolume', this.finalVolumeReal);
        this.set('sell', this.beginVolume - this.finalVolumeReal + this.buy);
      } else {
        this.set('sell', this.sellForecast);
        this.set('finalVolume', this.beginVolume + this.buy - this.sellForecast);
      }

      this.set('minBuy', this.tank.minVolume + this.sell - this.beginVolume);
      this.set('maxBuy', this.tank.maxVolume - this.beginVolume);
    },

    beforeUpdate: function() {
      // set finalVolume, sell
      if (this.finalVolumeReal) {
        this.set('finalVolume', this.finalVolumeReal);
        this.set('sell', this.beginVolume - this.finalVolumeReal + this.buy);
      } else {
        this.set('sell', this.sellForecast);
        this.set('finalVolume', this.beginVolume + this.buy - this.sellForecast);
      }

      this.set('minBuy', this.tank.minVolume + this.sell - this.beginVolume);
      this.set('maxBuy', this.tank.maxVolume - this.beginVolume);
    },

    afterUpdate: function () {
      var nextDate = moment(this.date).add(1, 'day').format('YYYY-MM-DD');
      var nextPlan = Plans.findOne({date: nextDate, station: this.station, "tank.gasoline": this.tank.gasoline});
      if (nextPlan && (nextPlan.beginVolume !== this.finalVolume)) {
        nextPlan.set('beginVolume', this.finalVolume);
        if (this.finalVolumeReal) {nextPlan.set('beginVolumeReal', true)}
        nextPlan.save();
      }
    }
  },

  methods: {
    references: function() {
      return Plans.find({station: this.station, "tank.gasoline": this.tank.gasoline}, {limit: 5}).fetch()
    }
  }
});
