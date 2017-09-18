export class Turing {
    headPosition: number;
    _line: Array<any> = [];
    _orders: object;

    constructor(headPosition, lineInput, orders) {
        this.headPosition = headPosition - 1;
        this.getLineFromString(lineInput);
        this.getOrdersFromString(orders);
        this.init();
    }

    getOrdersFromString(string) {
        const linesArray = string.split('\n').filter(function (e) {
            return e;
        });

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

    init() {
        this.printLine();
        this.proceed(0);
    }

    proceed(state, ms = 10) {
        let i = 0;
        const self = this;
        const orderGroup = this._orders[state];
        const stopBefore = orderGroup.length;
        const step = function (delay = null) {
            if (i < stopBefore) {
                i++;
                if (delay) {
                    setTimeout(iteration, delay);
                } else {
                    iteration();
                }
            }
        };
        const iteration = function () {
            const order = orderGroup[i];

            if (typeof order === 'undefined') {
                console.log(i);
                return 0;
            }

            if (self.validateSymbols(order.currentSymbol)) {
                if (self.setCurrentSymbol(order.newSymbol)) {
                    self.printLine();
                }

                self.moveHead(order.direction);

                self.proceed(order.newState, 10);
                return 0;
            }

            step(0);
        };

        setTimeout(iteration, ms);
    }

    clearHistory() {
        const historyEl = document.querySelectorAll('.primary-grid--history')[0];

        while (historyEl.hasChildNodes() && historyEl.childElementCount > 80) {
            historyEl.removeChild(historyEl.firstChild);
        }
    }

    printLine() {
        const historyEl = document.querySelectorAll('.primary-grid--history')[0];
        const node = document.createElement('div');
        node.innerHTML = this._line.join('');

        if (historyEl.childElementCount > 100) {
            this.clearHistory();
        }
        historyEl.appendChild(node);
        historyEl.scrollTo(0, historyEl.scrollHeight);
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
        return this._line[this.headPosition];
    }

    setCurrentSymbol(symbol) {
        if (symbol !== '*' && this._line[this.headPosition] !== symbol) {
            return this._line[this.headPosition] = symbol;
        }

        return false;
    }

    moveHead(direction) {
        switch (direction) {
            case 'R':
                this.headPosition++;
                break;
            case 'L':
                this.headPosition--;
                break;
            case '*':
                break;
        }
    }
}
