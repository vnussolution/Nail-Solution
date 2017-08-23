import 'hammerjs';
import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'


import { AppComponent } from './app.component';
import { NgbdCarouselBasic } from '../ng-bootstrap/carousel-basic';
import { NgbdDatepickerPopup } from '../ng-bootstrap/datepicker-popup';
import { InputTriggerDirective } from './input-trigger.directive'
import { AppServices } from './app.services';
import { EmployeeComponent, SelectEmployeeDialog } from './employee/employee.component'
import { WelcomeComponent } from './home/welcome.component';


// Angular Material
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ManagerComponent } from './manager/manager.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  exports: [
    CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ]
})
export class MaterialModule { }



@NgModule({
  declarations: [
    AppComponent,
    NgbdCarouselBasic,
    NgbdDatepickerPopup,
    InputTriggerDirective,
    SelectEmployeeDialog,
    EmployeeComponent,
    WelcomeComponent,
    SpinnerComponent,
    ManagerComponent,
    NavComponent
  ],
  entryComponents: [SelectEmployeeDialog, SpinnerComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    Angular2FontawesomeModule,
    MaterialModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdInputModule,
    FormsModule, ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'employee', component: EmployeeComponent },

      { path: 'manager', component: ManagerComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'employee', pathMatch: 'full' },
      { path: '**', redirectTo: 'employee', pathMatch: 'full' }
    ]),
  ],
  providers: [AppServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
