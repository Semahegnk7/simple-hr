import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { CompanyService } from 'src/app/services/company.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss']
})
export class DepartmentViewComponent implements AfterViewInit {
  departments: Department[] = [];
  id: number;
  deletedId:number
  registrationForm: FormGroup;
  deleteModal: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'company',
    'manager',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource<Department>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: DepartmentService, private router: Router,private compService:CompanyService) {
    this.url = this.router.url;
  }
  url: any;
lengths:number;
  ngAfterViewInit() {
    this.getDepartments();
  }
  getDepartments() {
    this.service.getDepartment().subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.lengths=this.dataSource.data.length;
      console.log(this.dataSource.data);
      this.getCompanyById(this.lengths)
    });
  }
  setEditId(id){
    sessionStorage.setItem("departmentId",id);
    this.router.navigate(['/addDepartment']);
  }
  setId(id:any){
    this.deletedId=id;
  }
 
  deleteDepartment(){
    this.service.deleteDepartment(this.deletedId).subscribe(resp=>{
      this.getDepartments();
    })
  }
  getCompanyById(len:number){
        for(let i=0;i<len;i++){
       this.compService.getCompanyById(this.dataSource.data[i].companyId).subscribe((resp)=>{
        this.dataSource.data[i].companyName=resp.companyName;

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
