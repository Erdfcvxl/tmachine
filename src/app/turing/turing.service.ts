import {split} from 'ts-node/dist';

export class TuringService {
    headPosition: number;
    _line: Array<any> = [];
    _orders: object;
    _text: string;
    text: string[];

    parseFile(text) {
        this._text = text;
        this.text = this._text.split('\n');

        this.setHeadPosition();
        this.getLineFromString(this.getLineInput());
        this.getOrdersFromString(this.getOrdersInput());
    }

    setHeadPosition() {
        this.headPosition = +this.text[0];
    }

    getHeadPosition() {
        return this.headPosition - 1;
    }

    getLineInput() {
        return this.text[1];
    }

    getOrdersInput() {
        this.text.shift();
        this.text.shift();

        return this.text.join('\n');
    }

    getOrdersFromString(string) {
        const linesArray = string.split('\n').filter(function (e) {
            return e;
        });
        const self = this;

        const result = {};

        for (let i = 0; i < linesArray.length; i++) {
            const state = linesArray[i].split(' ')[0];

            if (typeof result[state] !== 'undefined') {
                result[state].push(this.getOrderJSON(linesArray[i]));
            } else {
                result[state] = [this.getOrderJSON(linesArray[i])];
            }
        }

        this._orders = result;
    }

    getLineFromString(string) {
        for (let i = 0; i < string.length; i++) {
            this._line.push(string[i]);
        }
    }

    stepForward(state) {
        let i = 0;
        let result;
        const orderGroup = this._orders[state];

        while (typeof result === 'undefined') {
            const order = orderGroup[i];

            if (typeof order === 'undefined') {
                console.log('order undefined, kill process. Iteration of orders `i`: ', i);
                result = -1;
            } else {
                /*console.log('-------');
                console.log('HEAD POSITION', this.getHeadPosition());
                console.log('order state', state);
                console.log('-------');
                console.log('current symbol', this.getCurrentSymbol());
                console.log('current order symbol', order.currentSymbol);
                console.log('new symbol', order.newSymbol);
                console.log('move to', order.direction);
                console.log('new order state----------', order.newState);*/
                if (this.validateSymbols(order.currentSymbol)) {
                    if (this.setCurrentSymbol(order.newSymbol)) {
                        // Symbol changed
                    }

                    if (!this.moveHead(order.direction)) {
                        result = -1;
                    }

                    if (typeof result === 'undefined') {
                        result = order.newState;
                    }
                }

                i++;
            }
        }

        return result;
    }

    printLine() {
        return this._line.join('');
    }

    /* Helpers */
    validateSymbols(symbol) {
        return this.getCurrentSymbol() == symbol || symbol === '*';
    }

    getOrderJSON(order) {
        order = order.split(' ');

        return {
            currentSymbol: order[1],
            newSymbol: order[2],
            direction: order[3],
            newState: order[4],
        };
    }

    getCurrentSymbol() {
        return this._line[this.getHeadPosition()];
    }

    setCurrentSymbol(symbol) {
        if (symbol !== '*' && this._line[this.getHeadPosition()] !== symbol) {
            // console.log('paemiau' + this._line[this.getHeadPosition()] + 'ir pakeisiu i ' + symbol);
            return this._line[this.getHeadPosition()] = symbol;
        }

        return false;
    }

    moveHead(direction) {
        let success = true;

        switch (direction) {
            case 'R':
                if (this.headPosition + 1 < this._line.length) {
                    this.headPosition++;
                } else {
                    success = false;
                }
                break;
            case 'L':
                if (this.headPosition > 0) {
                    this.headPosition--;
                } else {
                    success = false;
                }
                break;
            case '*':
                break;
        }

        return success;
    }
}
