const Request = require('request');

class Helper {
    constructor(label) {
        this.label = label;
    }

    delay(timeout, func, ...args) {
        setTimeout(() => func.apply(this, args), timeout);
    }

    updateRenter(carNr, renter, message) {
        Request.patch({
            url: 'http://127.0.0.1:3000/cars/' + carNr + '/renter',
            json: { renter: renter }
        }, this.showResponse(message));
    }

    updateInvoice(invoiceNr, invoice, message) {
        Request.put({
            url: 'http://127.0.0.1:3000/invoices/' + invoiceNr,
            json: invoice
        }, this.showResponse(message));
    }

    showCarAndInvoice(carNr, invoiceNr, message) {
        this.showCar(carNr, message);
        this.showInvoice(invoiceNr, message);
    }

    showCar(carNr, message) {
        Request.get({
            url: 'http://127.0.0.1:3000/cars/' + carNr,
            json: true
        }, this.showResponse(message));
    }

    showInvoice(invoiceNr, message) {
        Request.get({
            url: 'http://127.0.0.1:3000/invoices/' + invoiceNr,
            json: true
        }, this.showResponse(message));
    }

    showResponse(message="") {
        let heading = this.label + ': ' + message;

        return function (error, response, body) {
            console.log(heading);
            console.log(body);
        };
    }
}

module.exports = Helper;