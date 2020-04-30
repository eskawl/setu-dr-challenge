const moment = require('moment');
const models = require('../../models');

const BillStatuses = {
    PENDING: 'PENDING',
    PAID: 'PAID',
}

class ApplicationError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, ApplicationError);
    }
}

exports.ApplicationError = ApplicationError;

const formatDate = date => `${moment(date).format("YYYY-MM-DDTHH:mm:ss")}Z`;

exports.getCustomer = async (filters) => {
    if(!filters) {
        return null;
    }

    return models.Customer.findOne({
        where: filters,
    });
}

exports.getCustomerBills = async (customerId, filters={status: BillStatuses.PENDING}) => {
    if(!customerId){
        throw new ApplicationError('CustomerId is needed');
    }

    const bills = await models.Bill.findAll({
        where: {
            customerId,
            ...filters,
        }
    });

    

    return bills.map(bill => {
        return {
            billerBillID: bill.id,
            generatedOn: formatDate(bill.createdAt),
            recurrence: "ONE_TIME",
            amountExactness: "EXACT",
            customerAccount: {
                id: customerId,
            },
            aggregates: {
                total: {
                    displayName: "Total Outstanding",
                    amount: {
                        value: bill.amount,
                    }
                }
            }
        }
    });
}

exports.payBillFromSetu = async (billId, paymentInfo) => {
    if(!billId){
        throw new ApplicationError('BillId is needed');
    }

    let bill = await models.Bill.findOne({
        where: {
            id: billId,
            status: BillStatuses.PENDING,
        }
    });

    if(!bill){
        throw new ApplicationError('Bill not found');
    }

    const {
        paymentDetails
    } = paymentInfo;

    const {
        platformTransactionRefID: platformReferenceId,
        uniquePaymentRefID: paymentRefId,
        amountPaid: { value: paidAmount },
    } = paymentDetails;

    if(paidAmount !== bill.amount) {
        throw new ApplicationError('Full amount must be paid');
    }

    bill.set({
        platformReferenceId,
        paymentRefId,
        transactionRefId: `SETU-${platformReferenceId}`,
        status: BillStatuses.PAID,
    });

    bill = await bill.save({ 
        returning: true, 
    });

    return {
        platformReferenceId: bill.platformReferenceId,
        date: formatDate(bill.updatedAt),
        id: bill.id,
    }

}


