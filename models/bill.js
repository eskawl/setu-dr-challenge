'use strict';
module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define('Bill', {
        customerId: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.Customer,
                key: 'id',
            },
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        platformReferenceId: {
            type: DataTypes.STRING,
        },
        transactionRefId: {
            type: DataTypes.STRING,
        },
        paymentRefId: {
            type: DataTypes.STRING,
        },
    }, {});



    Bill.associate = function (models) {
        // associations can be defined here
    };
    return Bill;
};