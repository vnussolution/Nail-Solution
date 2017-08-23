import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IRecord } from '../interfaces'
import { AppServices } from '../app.services'

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  pin: string = '';
  canView: boolean = false;
  records: IRecord[];
  errorMessage: string = '';


  constructor(private _appServices: AppServices, private _router: Router) { }

  ngOnInit() {

  }

  click(key: string) {
    this.pin = this.pin.concat(key);
  }

  checkPin() {
    let result = this._appServices.isManager(this.pin);
    if (result) {
      this.canView = true;
      this._appServices.getRecords().subscribe(
        records => {
          this.records = records;
          console.log('returned records: ', Date.now());
        },
        error => this.errorMessage = error
      );
    } else {
      this.pin = '';
      // this._router.navigate(['employee']);
    }
  }
}
