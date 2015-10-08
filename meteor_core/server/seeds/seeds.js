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