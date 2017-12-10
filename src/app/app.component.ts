import {Component, Input, Output, EventEmitter, QueryList, ViewChildren, AfterViewInit} from '@angular/core';
import {Turing} from './services/turing';
import {TuringComponent} from './turing/turing.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
    @ViewChildren(TuringComponent) turings: QueryList<TuringComponent>;
    allowProcess = false;

    ngAfterViewInit() {
        setTimeout(() => {
            this.allowProcess = true;
        }, 0);
    }

    nextIteration() {
        console.log('------');
        for (const turing of this.turings.toArray()) {
            turing.nextIteration();
        }
        console.log('------');
    }

    startAutoIterations() {
        setInterval(() => {
            this.nextIteration();
        }, 50);
    }
}
