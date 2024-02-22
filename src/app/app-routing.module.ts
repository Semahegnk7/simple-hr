import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyListComponent } from './components/company-add/company-list.component';
import { DepartmentViewComponent } from './components/department-view/department-view.component';
import { DepartmentAddComponent } from './components/department-add/department-add.component';
import { CandidateViewComponent } from './components/candidate-view/candidate-view.component';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';
import { SalaryViewComponent } from './components/salary-view/salary-view.component';
import { SalaryAddComponent } from './components/salary-add/salary-add.component';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeeViewComponent },
  { path: 'addEmployee', component: EmployeeAddComponent },
  { path: 'company', component: CompanyComponent },
  {path:"addCompany",component:CompanyListComponent},
  {path:"departments",component:DepartmentViewComponent},
  {path:"addDepartment",component:DepartmentAddComponent},
  {path:"candidates",component:CandidateViewComponent},
  {path:"addCandidate",component:CandidateAddComponent},
  {path:"salary",component:SalaryViewComponent},
  {path:"addSalary",component:SalaryAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
