// session variables
Meteor.startup(() =>{
  Session.set('startDate', moment().format('YYYY-MM-DD'));
  Session.set('finalDate', moment().add(1, 'day').format('YYYY-MM-DD'));
  Session.set('modal', null);
  Session.set('priceDisplayTotal', true);
});

// assure all Plans are created
Tracker.autorun(function () {
  if (Meteor.user()) {
    Meteor.call('createPlans', Session.get('finalDate'))
  }
});

moment.locale('en', {
  weekdaysShort : ["dom", "seg", "ter", "qua", "qui", "sex", "sab"]
});
