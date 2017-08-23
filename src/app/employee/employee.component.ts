import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import { MdDialogConfig, MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { IEmployee, IRecord } from '../interfaces';
import { AppServices } from '../app.services';
import { SpinnerComponent } from '../shared/spinner/spinner.component'

declare let $: Object;
const now = new Date();
const config = new MdDialogConfig();
@Component({
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
    title = 'app';
    closeResult: string;
    keypad: number;
    date: any;
    employees: IEmployee[];
    errorMessage: string;


    constructor(public dialog: MdDialog, private _appServices: AppServices) { }

    ngOnInit() {
        this._appServices.getEmployees().subscribe(
            employees => { this.employees = employees },
            error => { this.errorMessage = error; }
        );
    }

    // open the dialog
    openDialog(selectedEmployee: IEmployee) {
        let dialogRef = this.dialog.open(SelectEmployeeDialog, { data: selectedEmployee });
        dialogRef.afterClosed().subscribe(result => {
            console.log('close dialog', result);
            this.closeResult = result;
        });
    }
}

///////////////-----///////////////////////

@Component({
    selector: 'select-employee-dialog',
    templateUrl: './select-employee-dialog.html',
})
export class SelectEmployeeDialog {
    input: string;
    amount = '1';
    tip = '1';
    discount = '1';
    $ = window['$'];
    date: any;
    records: IRecord[];
    errorMessage: string;

    constructor(private _router: Router, private _appServices: AppServices, public dialog: MdDialog, public dialogRef: MdDialogRef<SelectEmployeeDialog>, @Inject(MD_DIALOG_DATA) public selectedEmployee: any) { }

    ngOnInit() {
        this.date = Date.now();
        // console.log('init employee dialog:: ', this.selectedEmployee);
        this._appServices.getRecords().subscribe(
            records => this.records = records,
            error => this.errorMessage = error
        );

        this.$('#mylabel').html('amount');
    }

    closeDialog(id) {
        this.dialogRef.close(id);
    }
    // handle key input
    click(key: string) {
        this.input = this.$('#mylabel').html();
        // handle key = clear
        if (key === 'clear') {
            if (this.input === 'amount')
                this.amount = '';
            else if (this.input === 'tip')
                this.tip = '';
            else this.discount = '';
        }

        // handle any key
        else {
            let regexNumber = /[1-9]/g;
            let regexDot = /[.]/g
            if (this.input === 'amount') {
                this.amount = this.amount.concat(key);

                // handle 02
                if (this.amount.slice(0, 1) === '0' && this.amount.match(/[0][1-9]/g)) this.amount = '';

                if (this.amount.slice(-1) === '0') {
                    //handle 00, 000
                    if (this.amount.length > 1 && this.amount.search(regexNumber) < 0)
                        this.amount = '0';
                }

                // handle 123.034.
                if (this.amount.slice(-1) === '.' && (this.amount.match(regexDot)).length > 1)
                    this.amount = this.amount.slice(0, -1);

                // handle .54 -> 0.54
                if (this.tip.slice(0) === '.')
                    this.tip = '0.';

            }

            else if (this.input === 'tip') {
                this.tip = this.tip.concat(key);

                // handle 02
                if (this.tip.slice(0, 1) === '0' && this.tip.match(/[0][1-9]/g)) this.tip = '';

                if (this.tip.slice(-1) === '0') {
                    //handle 00, 000
                    if (this.tip.length > 1 && this.tip.search(regexNumber) < 0)
                        this.tip = '0';
                }

                // handle 123.034.
                if (this.tip.slice(-1) === '.' && (this.tip.match(regexDot)).length > 1) {
                    this.tip = this.tip.slice(0, -1);
                }
                // handle .54 -> 0.54
                if (this.tip.slice(0) === '.')
                    this.tip = '0.';
            }

            else if (this.input === 'discount') {
                this.discount = this.discount.concat(key);

                // handle 02
                if (this.discount.slice(0, 1) === '0' && this.discount.match(/[0][1-9]/g)) this.discount = '';

                if (this.discount.slice(-1) === '0') {
                    //handle 00, 000
                    if (this.discount.length > 1 && this.discount.search(regexNumber) < 0)
                        this.discount = '0';
                }

                // handle 123.034.
                if (this.discount.slice(-1) === '.' && (this.discount.match(regexDot)).length > 1) {
                    this.discount = this.tip.slice(0, -1);
                }
                // handle .54 -> 0.54
                if (this.discount.slice(0) === '.')
                    this.discount = '0.';
            }

        }
        console.log(this.input, this.amount, this.tip, this.discount);
    }

    //reset the form
    cancel() {
        this.tip = '';
        this.amount = '';
        this.discount = '';
    }

    // save the record
    add() {
        let record = { discount: this.discount, date: this.date, employeeId: this.selectedEmployee.id, amount: this.amount, tip: this.tip, firstName: this.selectedEmployee.firstName };
        //this.records.unshift(record);
        this._appServices.postRecord(record);
        this.cancel();
        this.dialog.open(SpinnerComponent, { panelClass: 'custom-spinner' });
        this.dialogRef.close();
    }

    // disable the save button if form is not valid
    formValid() {

        if (this.selectedEmployee && this.tip !== '' &&
            this.amount !== '' && this.date && this.discount !== '') {
            return false;
        }
        return true;
    }

}
