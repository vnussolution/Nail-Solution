import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material'


@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  color = 'accent';
  mode = 'indeterminate';
  value = 40;

  constructor(public dialog: MdDialog, public dialogRef: MdDialogRef<SpinnerComponent>) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);

  }

}
