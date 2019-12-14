class Car {
    constructor(brand, model, color, renter) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.renter = renter;
    }

    setRenter(renter) {
        this.renter = renter;
    }
}

module.exports = Car;