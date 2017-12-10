import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TuringService} from './turing.service';

@Component({
    selector: 'app-turing',
    templateUrl: './turing.component.html',
})
export class TuringComponent {
    showInput: boolean = true;
    fileName: string;
    line: string;
    done: boolean = false;

    state: number = 0;

    private turingService: TuringService;

    constructor() {
        this.turingService = new TuringService;
    }

    readFile(e) {
        const self = this;
        const file = e.srcElement.files[0];

        this.fileName = file.name;

        const reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function () {
            self.turingService.parseFile(reader.result);
            console.log(self.turingService._orders);
            self.line = self.turingService.printLine();
            self.showInput = false;
        });

        // Read in the image file as a data URL.
        reader.readAsText(file);
    }

    nextIteration() {
        if (!this.showInput && !this.done) {
            const result = this.turingService.stepForward(this.state);

            if (result >= 0) {
                this.state = result;
                this.line = this.turingService.printLine();
                console.log(this.turingService.printLine());
            } else { // Neither head or line was changed
                this.done = true;
            }
        }
    }
}
