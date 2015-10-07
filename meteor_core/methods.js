// save method
Meteor.methods({
  'save': function(model) {
    if (model.validate() && this.userId) {
      model.save();
      return model;
    }
    model.throwValidationException();
  }
});

Meteor.methods({
  'remove': function(model) {
    if (this.userId) {
      model.remove();
    }
  }
});

// create plans
Meteor.methods({
  'createPlans': function(finalDateForReport) {
    Stations.find().fetch().forEach(function(station) {
      Meteor.call('createPlanForEachStation', station, finalDateForReport)
    });
  }
});

Meteor.methods({
  'createPlanForEachStation': function(station, finalDateForReport) {

    var lastDateOnDB = Plans.findOne({station: station.name}, {sort: {date: -1}});

    if (lastDateOnDB) {
      lastDateOnDB = lastDateOnDB.date;
    } else {
      console.log('no plans');
      throw 'no plans';
    }

    lastDateOnDB = moment(lastDateOnDB).add(1, 'day');
    finalDateForReport = moment(finalDateForReport);

    if (lastDateOnDB.diff(finalDateForReport) > 0) { return true; }

    while (lastDateOnDB.diff(finalDateForReport) <= 0) {
      Meteor.call('createPlanForEachTank', station, lastDateOnDB.format('YYYY-MM-DD'));
      lastDateOnDB.add(1, 'day');
    }
  }
});

// Create plans for all tanks
Meteor.methods({
  'createPlanForEachTank': function(station, date) {

    if (this.userId) {
      var tanks = station.tanks;

      tanks.map(function (tank) {
        var plan = new Plan({
          date: date,
          station: station.name,
          tank: tank
        });
        Meteor.call('save', plan);
      });
    }
  }
});