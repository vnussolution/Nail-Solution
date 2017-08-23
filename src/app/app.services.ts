import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IEmployee, IRecord } from './interfaces';

@Injectable()
export class AppServices {

    private _employeesUrl = 'http://nailsnail.azurewebsites.net/employees?_sort=firstName&_order=asc';
    private _recordsUrl = 'http://nailsnail.azurewebsites.net/records';


    constructor(private _http: HttpClient) { }

    //  getEmployees(): IEmployee[] {
    getEmployees(): Observable<IEmployee[]> {
        return this._http.get<IEmployee[]>(this._employeesUrl)
            .do(data => console.log('ALL: ' + JSON.stringify(data)))
            .catch(this.handleError);  // for future use

        // return this.http.get(this._employeesUrl)
        //     .map((response: Response) => {
        //         return <IEmployee>response.json();
        //     }).catch(this.handleError);

    }

    getRecords(): Observable<IRecord[]> {

        return this._http.get<IRecord[]>(this._recordsUrl)
            .do(data => console.log(`ALL records: ` + JSON.stringify(data)))
            .catch(this.handleError);
    }

    postRecord(record) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = `${this._recordsUrl}`;
        this._http.post(url, record).subscribe();
    }

    isManager(pin: string): boolean {

        return pin === '123';
    }


    private handleError(error: Response) {
        console.log('/Events/id/ ERROR::', error);
        return Observable.throw(error.statusText);
    }


}