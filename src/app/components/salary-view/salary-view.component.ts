import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Salary } from 'src/app/models/salary';
import { SalaryService } from 'src/app/services/salary.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
  styleUrls: ['./salary-view.component.scss'],
  providers: [CurrencyPipe]
})
export class SalaryViewComponent implements AfterViewInit {
   id: number;
  deletedId:number
  registrationForm: FormGroup;
   displayedColumns: string[] = [
    'id',
    'employeeName',
    'level',
    'effectiveDate',
    'salary',
    'actions',
  ];
  dataSource = new MatTableDataSource<Salary>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: SalaryService, private router: Router,private currencyPipe: CurrencyPipe) {
    this.url = this.router.url;
  }
  url: any;
lengths:number;
  ngAfterViewInit() {
    this.getSalarys();
  }
  getSalarys() {
    this.service.getSalary().subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data)
    });
  }
  setEditId(id){
    sessionStorage.setItem("salaryId",id);
    this.router.navigate(['/addSalary']);
  }
  setId(id:any){
    this.deletedId=id;
  }
 
  deleteSalary(){
    this.service.deleteSalary(this.deletedId).subscribe(resp=>{
      this.getSalarys();
    })
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
