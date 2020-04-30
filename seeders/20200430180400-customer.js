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
        const customers = [];

        for (let index = 0; index < 100; index++) {
            customers.push({
                name: faker.name.findName(),
                phone: (9000000000 + index).toString(),
                createdAt: faker.date.past(),
            });
        }

        return queryInterface.bulkInsert('Customer', customers);
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.bulkDelete('Customer', null, {});
    }
};
