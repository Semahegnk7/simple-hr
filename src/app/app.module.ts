import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeData } from './data/HR-data';
import {MatButtonModule} from '@angular/material/button';

import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { SidbarComponent } from './dashboard/sidbar/sidbar.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CompanyListComponent } from './components/company-add/company-list.component';
import { CompanyComponent } from './components/company/company.component';
import { DepartmentViewComponent } from './components/department-view/department-view.component';
import { DepartmentAddComponent } from './components/department-add/department-add.component';
import { CandidateViewComponent } from './components/candidate-view/candidate-view.component';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';
import { SalaryViewComponent } from './components/salary-view/salary-view.component';
import { SalaryAddComponent } from './components/salary-add/salary-add.component';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SidbarComponent,
    DashboardComponent,
    CompanyListComponent,
    CompanyComponent,
    DepartmentViewComponent,
    DepartmentAddComponent,
    CandidateViewComponent,
    CandidateAddComponent,
    SalaryViewComponent,
    SalaryAddComponent,
    EmployeeViewComponent,
    EmployeeAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfiniteScrollModule,
    NgSelectModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(EmployeeData,{delay:500}),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
