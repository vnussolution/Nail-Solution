import { Component, OnInit, SimpleChanges, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

declare let $: Object;
const now = new Date();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  closeResult: string;
  keypad: number;
  $ = window['$'];
  input: string;
  amount = '';
  tip = '';
  discount = '';
  selectEmployee = 'Select Employee';
  date: any;

  public employees: IEmployee[] = [{ id: 1, name: 'Annie', level: 1 }, { id: 2, name: 'Tommy', level: 2 }, { id: 3, name: 'Tony', level: 1 }, { id: 4, name: 'Grace', level: 3 }, { id: 1, name: 'Annie', level: 1 }, { id: 2, name: 'Tommy', level: 2 }, { id: 3, name: 'Tony', level: 1 }, { id: 4, name: 'Grace', level: 3 }, { id: 1, name: 'Annie', level: 1 }, { id: 2, name: 'Tommy', level: 2 }, { id: 3, name: 'Tony', level: 1 }, { id: 4, name: 'Grace', level: 3 }, { id: 1, name: 'Annie', level: 1 }, { id: 2, name: 'Tommy', level: 2 }, { id: 3, name: 'Tony', level: 1 }, { id: 4, name: 'Grace', level: 3 }]

  public records: IRecord[] = [{ id: 1, date: new Date('1/2/2031'), employeeId: 1, employeeName: 'Annie', amount: 34, tip: 4 },
  { id: 2, date: new Date('1/2/2031'), employeeId: 1, employeeName: 'Tommy', amount: 34, tip: 14 },
  { id: 3, date: new Date('1/3/2031'), employeeId: 1, employeeName: 'Tony', amount: 64, tip: 23 },
  { id: 4, date: new Date('1/4/2031'), employeeId: 1, employeeName: 'Grace', amount: 74, tip: 14 },
  { id: 1, date: new Date('1/5/2031'), employeeId: 1, employeeName: 'Annie', amount: 84, tip: 14 }];

  constructor(private modalService: NgbModal, public dialog: MdDialog) { }

  ngOnInit() {
    this.date = Date.now();
  }

  ngOnChanges(changes: SimpleChanges) {

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

  cancel() {
    this.tip = '';
    this.amount = '';
    this.discount = '';
    this.selectEmployee = 'Select Employee';
  }

  add() {
    let record: IRecord = { discount: +this.discount, id: this.records.length + 1, date: this.date, employeeId: 1, employeeName: this.selectEmployee, amount: +this.amount, tip: +this.tip };
    this.records.unshift(record);
    this.cancel();
  }

  formValid() {

    if (this.selectEmployee !== 'Select Employee' && this.tip !== '' &&
      this.amount !== '' && this.date && this.discount !== '') {
      return false;
    }
    return true;
  }

  openDialog() {
    let dialogRef = this.dialog.open(SelectEmployeeDialog, { data: this.employees });
    dialogRef.afterClosed().subscribe(result => {
      console.log('close dialog', result);
      this.closeResult = result;
      this.selectEmployee = result === '' ? 'Select Employee' : result;
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result.name}`;
      this.selectEmployee = result.name;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}


@Component({
  selector: 'select-employee-dialog',
  templateUrl: './select-employee-dialog.html',
})
export class SelectEmployeeDialog {
  constructor(public dialogRef: MdDialogRef<SelectEmployeeDialog>, @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }

  closeDialog(id) {
    this.dialogRef.close(id);
  }

}


interface IEmployee {
  id: number,
  name: string,
  level: number
}

interface IRecord {
  id: number,
  date: Date,
  employeeId: number,
  employeeName: string,
  amount: number,
  tip: number,
  discount?: number

}