import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Turing} from './services/turing';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
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
            document.querySelectorAll('.primary-grid')[0].classList.add('primary-grid---proccess');
        }
    }

    expand() {
        document.querySelectorAll('.primary-grid')[0].classList.remove('primary-grid---proccess');
        location.reload();
    }


    populateDummy() {
        this._headPosition = 7;
        this._lineInput = '000100000000000000001111111000000000000000010000';
        this._orders = `0 0 0 R 0
0 1 0 R 11
11 1 1 R 11
11 0 1 R 2
2 0 0 L 3
2 1 1 L 4
3 1 1 L 3
3 0 0 R 0
4 1 0 L 5
4 0 0 L 4
5 1 1 L 5
5 0 1 L 12
12 0 0 R 6
12 1 1 R 0
6 1 1 R 6
6 0 0 L 4`;
    }
}
