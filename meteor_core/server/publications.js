Meteor.publish('plans', function(startDate, finalDate){
  if (this.userId) {
    return Plans.find({date: {$lte: finalDate, $gte: startDate}});
  }
});

Meteor.publish('plansFilter', function(station, date){
  if (this.userId) {
    return Plans.find({
      station: station,
      date: date
    });
  }
});

Meteor.publish('plansAlert', function(station, date){
  if (this.userId) {
    return Plans.find({
      station: station,
      date: {$lt: date},
      finalVolumeReal: null
    }, {limit: 1, sort: {date: 1}});
  }
});

Meteor.publish('planLast5', function(plan){
  if (this.userId) {
    return plan.last5();
  }
});

Meteor.publish('planSpecialDay', function(plan){
  if (this.userId) {
    return plan.specialDay();
  }
});

Meteor.publish('stations', function(){
  if (this.userId) {
    return Stations.find();
  }
});

Meteor.publish('suppliers', function(){
  if (this.userId) {
    return Suppliers.find();
  }
});

Meteor.publish('prices', function(){
  if (this.userId) {
    return Prices.find();
  }
});

Meteor.publish('trucks', function(){
  if (this.userId) {
    return Trucks.find();
  }
});

Meteor.publish("users", function () {
  if (this.userId) {
    return Meteor.users.find();
  } else {
    this.ready();
  }
});

Meteor.publish('holidays', function(){
  return Holidays.find();
});