class Invoice {
    constructor(person, amount) {
        this.person = person;
        this.amount = amount;
    }

    update(invoice) {
        this.person = invoice.person;
        this.amount = invoice.amount;
    }
}

module.exports = Invoice;