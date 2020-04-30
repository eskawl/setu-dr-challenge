const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */

        const bills = [];

        for (let index = 0; index < 200; index++) {
            bills.push({
                customerId: faker.random.number({
                    min: 20, max: 70
                }),
                amount: faker.random.number({
                    min: 200, max: 400
                }),
                status: 'PENDING',
                createdAt: faker.date.past(),
            });
            
        }
        return queryInterface.bulkInsert('Bill', bills);
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.bulkDelete('Bill', null, {});
    }
};
