import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements AfterViewInit {
  id: number;
  deletedId:number
  registrationForm: FormGroup;
  deleteModal: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'description',
    'status',
    'industry',
    'date', //establishment date
    'size',
    'actions',
  ];
  dataSource = new MatTableDataSource<Company>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private compService: CompanyService, private router: Router) {
    this.url = this.router.url;
  }
  url: any;

  ngAfterViewInit() {
    this.getCompanies();
  }
  getCompanies() {
    this.compService.getCompany().subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);
    });
  }
  setEditId(id){
    sessionStorage.setItem("companyId",id);
    this.router.navigate(['/addCompany']);
  }
  setId(id:any){
    this.deletedId=id;
  }
 
  deleteCompany(){
    this.compService.deleteCompany(this.deletedId).subscribe(resp=>{
      this.getCompanies();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*  addNew() {
    const data: Company = {
      id: 23,
      logo: 'logo1.jpg',
      companyName: 'Technology',
      companyAddress: 'Addis Ababa',
      description: 'descriptions',
      companyStatus: 'open',
      companyIndustry: 'Technology',
      companySize: 4500,
      establishmentDate: '4/3/2022',
    };
    this.compService.createCompany(data).subscribe((resp) => {
             this.getCompanies();
    });
  } */
}
