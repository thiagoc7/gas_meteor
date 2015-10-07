//Stations
Meteor.startup(() => {
  if (Stations.find().count() === 0) {
    [
      {
        name: 'Oliveira',
        weakDays: [15, 31],
        strongDays: [1, 16],
        tanks: [
          {
            gasoline: 'S500',
            number: [1, 3, 6],
            capacity: 50000,
            minVolume: 25000,
            maxVolume: 55000
          },
          {
            gasoline: 'S10',
            number: [4],
            capacity: 15000,
            minVolume: 7000,
            maxVolume: 18000
          },
          {
            gasoline: 'GC',
            number: [5],
            capacity: 15000,
            minVolume: 5000,
            maxVolume: 16000
          },
          {
            gasoline: 'ET',
            number: [2],
            capacity: 10000,
            minVolume: 3000,
            maxVolume: 10500
          }
        ]
      },
      {
        name: 'Outeiro',
        tanks: [
          {
            gasoline: 'S500',
            number: [1],
            capacity: 15000,
            minVolume: 3000,
            maxVolume: 15000
          },
          {
            gasoline: 'S10',
            number: [2],
            capacity: 15000,
            minVolume: 3000,
            maxVolume: 15000
          },
          {
            gasoline: 'ET',
            number: [3],
            capacity: 15000,
            minVolume: 3000,
            maxVolume: 15000
          },
          {
            gasoline: 'GC',
            number: [4, 5],
            capacity: 30000,
            minVolume: 5000,
            maxVolume: 30500
          },
          {
            gasoline: 'GA',
            number: [6],
            capacity: 15000,
            minVolume: 2000,
            maxVolume: 15000
          }
        ]
      }
    ].forEach(function(station){
      var newStation = new Station(station);
      newStation.save();
    });
  }
});


// Holidays
Meteor.startup(() => {
  if (Holidays.find().count() === 0) {

    var fs = Npm.require('fs');
    var path = Npm.require('path');
    var basepath = path.resolve('.').split('.meteor')[0];
    var excel = new Excel('xls');
    var workbook = excel.readFile( basepath+'/server/feriados_nacionais.xls');
    var yourSheetsName = workbook.SheetNames;
    var workbookJson = excel.utils.sheet_to_json(workbook.Sheets[yourSheetsName[0]]);

    workbookJson.forEach(holiday => {
      var newHoliday = new Holiday({date: moment(holiday.Data, 'MM/DD/YY').format('YYYY-MM-DD'), name: holiday.Feriado});
      newHoliday.save();
    });
  }
});

//plans
Meteor.startup(function () {
  if (Plans.find().count() === 0) {
    var oliveira = Stations.findOne({name: 'Oliveira'});
    var outeiro = Stations.findOne({name: 'Outeiro'});

    [
      {
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        station: oliveira.name,
        tank: oliveira.tanks[0],
        'beginVolume': 10000,
        'buy': 5000,
        'finalVolumeReal': 12000
      },
      {
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        station: oliveira.name,
        tank: oliveira.tanks[1],
        'beginVolume': 8000,
        'buy': 4000,
        'finalVolumeReal': 10000
      },
      {
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        station: oliveira.name,
        tank: oliveira.tanks[0],
        'buy': 3000,
        'finalVolumeReal': 11000
      },
      {
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        station: oliveira.name,
        tank: oliveira.tanks[1],
        'finalVolumeReal': 8000
      },
      {
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        station: oliveira.name,
        tank: oliveira.tanks[2],
        'beginVolume': 10000,
        'buy': 5000,
        'finalVolumeReal': 12000
      },
      {
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        station: oliveira.name,
        tank: oliveira.tanks[3],
        'beginVolume': 8000,
        'buy': 4000,
        'finalVolumeReal': 10000
      },
      {
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        station: oliveira.name,
        tank: oliveira.tanks[2],
        'buy': 3000,
        'finalVolumeReal': 11000
      },
      {
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        station: oliveira.name,
        tank: oliveira.tanks[3],
        'finalVolumeReal': 8000
      },
      {
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[0],
        'beginVolume': 8000,
        'buy': 5000,
        'finalVolumeReal': 12000
      },
      {
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[1],
        'beginVolume': 8000,
        'buy': 3000,
        'finalVolumeReal': 10000
      },
      {
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[0],
        'buy': 1000,
        'finalVolumeReal': 11000
      },
      {
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[1],
        'finalVolumeReal': 7500
      },
      {
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[2],
        'beginVolume': 8000,
        'buy': 5000,
        'finalVolumeReal': 12000
      },
      {
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[3],
        'beginVolume': 8000,
        'buy': 3000,
        'finalVolumeReal': 10000
      },
      {
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[2],
        'buy': 1000,
        'finalVolumeReal': 11000
      },
      {
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[3],
        'finalVolumeReal': 7500
      },
      {
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[4],
        'beginVolume': 8000,
        'buy': 3000,
        'finalVolumeReal': 10000
      },
      {
        date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        station: outeiro.name,
        tank: outeiro.tanks[4],
        'buy': 1000,
        'finalVolumeReal': 11000
      }
    ].forEach(function(plan){
      var newPlan = new Plan(plan);
      newPlan.save();
    });
  }
});

//Suppliers
Meteor.startup(() => {
  if (Suppliers.find().count() === 0) {
    [
      {
        name: 'Triângulo',
        contact: 'Eliete',
        emails: ['triangulo@test.com'],
        phones: ['11122-3232', '32324*232']
      },
      {
        name: 'Ale',
        contact: 'EliBlaBlaete',
        emails: ['ale@test.com', 'ale2@test.com'],
        phones: ['11122-3232']
      }
    ].forEach(function(supplier){
      var newSupplier = new Supplier(supplier);
      newSupplier.save();
    });
  }
});

//prices
Meteor.startup(() => {
  if (Prices.find().count() === 0) {
    [
      {
        supplier: 'Triângulo',
        gasoline: 'GC',
        price: '2,566'
      },
      {
        supplier: 'Triângulo',
        gasoline: 'ET',
        price: '1,566'
      },
      {
        supplier: 'Triângulo',
        gasoline: 'S500',
        price: '2,566'
      },
      {
        supplier: 'Ale',
        gasoline: 'GC',
        price: '2,566'
      },
      {
        supplier: 'Ale',
        gasoline: 'S10',
        price: '1,466'
      },
      {
        supplier: 'Ale',
        gasoline: 'S500',
        price: '2,566'
      }
    ].forEach(function(price){
      var newPrice = new Price(price);
      newPrice.save();
    });
  }
});

// Trucks
Meteor.startup(() => {
  if (Trucks.find().count() === 0) {
    [
      {
        tanks: [5000, 5000, 5000]
      },
      {
        tanks: [5000, 5000, 5000]
      },
      {
        tanks: [30000]
      },
      {
        tanks: [10000, 10000, 5000, 5000]
      },
      {
        tanks: [3000, 3000, 4000]
      }
    ].forEach(function(truck){
      var newTruck = new Truck(truck);
      newTruck.save();
    });
  }
});