export class Turing {
    _headPosition: null;
    _lineInput: null;
    _orders: null;

    constructor(headPosition, lineInput, orders) {
        this._headPosition = headPosition;
        this._lineInput = lineInput;
        this._orders = this.getOrdersFromString(orders);

        this.init();
    }

    getOrdersFromString(string) {
        this._orders = string.split('\n').filter(function(e){ return e});
    }

    init() {

    }
}