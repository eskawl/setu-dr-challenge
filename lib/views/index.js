const { getCustomer, getCustomerBills, payBillFromSetu } = require('../controllers')

exports.getBills = async (req, res, next) => {
    try {
        const {
            customerIdentifiers,
        } = req.body;

        const customer = await getCustomer({phone: customerIdentifiers[0].attributeValue});
    
        const SETU_BILL_FETCH_STATUSES = {
            BILLS_NOT_AVAILABLE: "NO_OUTSTANDING",
            BILLS_AVAILABLE: "AVAILABLE"
        }
    
        if(customer){
            const bills = await getCustomerBills(customer.id);
    
            const data = {
                customer,
                billDetails: {}
            };
    
            if(!bills.length){
                data.billDetails.billFetchStatus = SETU_BILL_FETCH_STATUSES.BILLS_NOT_AVAILABLE;
                data.billDetails.bills = bills;
            } else {
                data.billDetails.billFetchStatus = SETU_BILL_FETCH_STATUSES.BILLS_AVAILABLE;
                data.billDetails.bills = bills;
            }
    
            res.json({
                status: 200,
                success: true,
                data
            })
        } else {
            res.status(404).json({
                status: 404,
                success: false,
                error : {
                    "code"        : "customer-not-found",
                    "title"       : "Customer not found",
                    "traceID"     : "",
                    "description" : "The requested customer was not found in the biller system.",
                    "param"       : "",
                    "docURL"      : "",
                }
            });
        }
        
    } catch (error) {
        next(error);
    }
}

exports.getReceipt = async (req, res, next) => {
    try {
        const {
            billerBillID: billId,
            ...paymentInfo
        } = req.body;
    
    
    
        const receipt = await payBillFromSetu(billId, paymentInfo)
        res.json({
            success: true,
            status: 200,
            data: {
                billerBillID: billId,
                platformBillID: paymentInfo.platformBillID,
                platformTransactionRefID: receipt.platformReferenceId,
                receipt,
            }
        })
    } catch (error) {
        next(error);
    }
}
