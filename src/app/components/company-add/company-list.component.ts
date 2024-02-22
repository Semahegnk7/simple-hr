import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})

export class CompanyListComponent implements OnInit{
  dataSource= new MatTableDataSource<Company>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  registrationForm:FormGroup;
  isSuccess:boolean=false;
  id:number;
  data:any;
  update:boolean=false;
  constructor(private router:Router, private service:CompanyService,private formBuilder:FormBuilder){

  }
  ngOnInit(): void {
    this.setEditedData();
    
    this.registrationForm=this.formBuilder.group({
      name:['', Validators.required ],
      address:['', Validators.required ],
      industry:['', Validators.required ],
      size:['', Validators.required ],
      description:['', Validators.required ],
      status:['', Validators.required],
      date:['' ,Validators.required],
    })
  }
  reset(){
    this.registrationForm.reset();
  }
  setEditedData(){
    this.id=parseInt(sessionStorage.getItem("companyId"))
    sessionStorage.removeItem("companyId");
    
    if(this.id){
      this.update=true;
this.service.getCompanyById(this.id).subscribe(resp=>{
  this.data=resp;
  console.log(this.data);
  
  this.registrationForm.controls['name'].setValue(this.data.companyName);
  this.registrationForm.controls['industry'].setValue(this.data.companyIndustry);
  this.registrationForm.controls['address'].setValue(this.data.companyAddress);

  this.registrationForm.controls['size'].setValue(this.data.companySize);
  this.registrationForm.controls['status'].setValue(this.data.companyStatus);
  this.registrationForm.controls['description'].setValue(this.data.description);
  this.registrationForm.controls['date'].setValue(this.data.establishmentDate);

});

    }
  }
  updateInfo(){
    if(this.registrationForm.valid){
      
      console.log(this.registrationForm.value.name)
      const data:Company={
    id:this.id,companyName:this.registrationForm.value.name,
    companyAddress:this.registrationForm.value.address,
    description:this.registrationForm.value.description,companyStatus:this.registrationForm.value.status,
    companyIndustry:this.registrationForm.value.industry,
    companySize:this.registrationForm.value.size,establishmentDate:this.registrationForm.value.date
  }
  this.service.updateCompany(data,this.id).subscribe(resp=>{
 
    alert("SuccessFull")
    this.update=false
});
  
}else{
  alert("Some Thing went wrong!!!");
}
}
  addNew(){
    if(this.registrationForm.valid){
      this.getLastId();
      this.lastId++;
      console.log(this.registrationForm.value.name)
      const data:Company={
    id:this.lastId,companyName:this.registrationForm.value.name,
    companyAddress:this.registrationForm.value.address,
    description:this.registrationForm.value.description,companyStatus:this.registrationForm.value.status,
    companyIndustry:this.registrationForm.value.industry,
    companySize:this.registrationForm.value.size,establishmentDate:this.registrationForm.value.date
  }
       this.service.createCompany(data).subscribe(resp=>{
       
      alert("SuccessFull")
});

}
else{
  alert("Something went wrong")
}
  }
  lastId:any;
totalData:any; 
  getLastId(){ // Id Auto Increment
    this.service.getCompany().subscribe(resp=>{
console.log(resp);
this.totalData=resp;
this.lastId=resp[resp.length-1].id;

    })
    
  }
  
}
