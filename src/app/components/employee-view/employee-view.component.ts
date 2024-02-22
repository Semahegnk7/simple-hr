import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements AfterViewInit {
  id: number;
  deletedId:number
  registrationForm: FormGroup;
  deleteModal: any;
  displayedColumns: string[] = [
    'id',
    'fname',
    'lname',
    'address',
    'email',
    'position',
    'department',
    'level',
    'phone',
    'education',
    'status',
        'empDate',//date of employment
    'actions',
  ];
  dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: EmployeeService, private router: Router,private compService:CompanyService) {
    this.url = this.router.url;
  }
  url: any;
lengths:number;
  ngAfterViewInit() {
    this.getEmployees();
  }
  getEmployees() {
    this.service.getEmployee().subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.lengths=this.dataSource.data.length;
    });
  }
  setEditId(id){
    sessionStorage.setItem("EmployeeId",id);
    this.router.navigate(['/addEmployee']);
  }
  setId(id:any){
    this.deletedId=id;
  }
 
  deleteEmployee(){
    this.service.deleteEmployee(this.deletedId).subscribe(resp=>{
      this.getEmployees();
    })
  }
  getCompanyById(len:number){
        for(let i=0;i<len;i++){
       this.compService.getCompanyById(this.dataSource.data[i].id).subscribe((resp)=>{
      //  this.dataSource.data[i].resume=resp.companyName;

       });
    }
    
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
