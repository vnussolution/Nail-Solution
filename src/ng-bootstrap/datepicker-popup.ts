import { Component, OnInit, Output, Input } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


const now = new Date();
@Component({
    selector: 'ngbd-datepicker-popup',
    templateUrl: './datepicker-popup.html'
})
export class NgbdDatepickerPopup implements OnInit {
    public dpModel: NgbDateStruct;

    constructor() { }

    ngOnInit() {
        this.dpModel = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    }

}
