import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Turing} from './services/turing';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./styles/primary-grid.css']
})
export class AppComponent {
    _headPosition: any;
    _lineInput: any;
    _orders: any;

    proceed() {
        if (
            this._headPosition !== null &&
            this._lineInput !== null &&
            this._orders !== null
        ) {
            new Turing(this._headPosition, this._lineInput, this._orders);
        }
    }

    getOrdersFromString(string) {
        let orders = string.split('\n');

        orders = orders.filter(function(e){ return e});

        console.log(orders);
    }

    populateDummy() {
        this._headPosition = 1;
        this._lineInput = '00V0000000001111*A000000000001111*B000000000000000000000000ZR000000000H000000';
        this._orders = '0 0 0 R 0\n' +
            '0 1 1 R 0\n' +
            '0 V V R 0 \n' +
            '0 * * L 1\n' +
            '\n' +
            '1 0 * R 2\n' +
            '1 1 * R 3\n' +
            '1 V V R 20\n' +
            '1 V V R 20\n' +
            '\n' +
            '2 * 0 R 4\n' +
            '3 * 1 R 5\n' +
            '\n' +
            '4 A A R 4\n' +
            '4 0 0 R 4\n' +
            '4 1 1 R 4\n' +
            '5 A A R 5\n' +
            '5 0 0 R 5\n' +
            '5 1 1 R 5\n' +
            '\n' +
            '4 * * L 6\n' +
            '5 * * L 7\n' +
            '\n' +
            '6 0 * R 8\n' +
            '6 1 * R 9\n' +
            '7 0 * R 10\n' +
            '7 1 * R 11\n' +
            '6 A A R 20\n' +
            '7 A A R 20\n' +
            '\n' +
            '8 * 0 R 12\n' +
            '9 * 1 R 13\n' +
            '10 * 0 R 14\n' +
            '11 * 1 R 15\n' +
            '\n' +
            '12 B B R 12\n' +
            '12 0 0 R 12\n' +
            '12 1 1 R 12\n' +
            '13 B B R 13\n' +
            '13 0 0 R 13\n' +
            '13 1 1 R 13\n' +
            '14 B B R 14\n' +
            '14 0 0 R 14\n' +
            '14 1 1 R 14\n' +
            '15 B B R 15\n' +
            '15 0 0 R 15\n' +
            '15 1 1 R 15\n' +
            '\n' +
            '12 Z 0 L 16\n' +
            '13 Z 1 L 16\n' +
            '14 Z 1 L 16\n' +
            '15 Z 0 L 17\n' +
            '\n' +
            '12 C 1 L 16\n' +
            '13 C 0 L 17\n' +
            '14 C 0 L 17\n' +
            '15 C 1 L 17\n' +
            '\n' +
            '16 0 Z L 18\n' +
            '17 0 C L 18\n' +
            '\n' +
            '18 A A L 18\n' +
            '18 B B L 18\n' +
            '18 * * L 18\n' +
            '18 0 0 L 18\n' +
            '18 1 1 L 18\n' +
            '18 V V R 0\n' +
            '\n' +
            '20 A A R 20\n' +
            '20 B B R 20\n' +
            '20 * * R 20\n' +
            '20 0 0 R 20\n' +
            '20 1 1 R 20\n' +
            '20 Z 0 R 21\n' +
            '20 C 1 R 21\n' +
            '\n' +
            '21 0 0 R X\n' +
            '21 1 1 R X\n' +
            '\n';
    }
}
