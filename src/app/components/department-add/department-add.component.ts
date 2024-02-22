import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from '../../models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit{
  dataSource= new MatTableDataSource<Department>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  registrationForm:FormGroup;
  isSuccess:boolean=false;
  id:number;
  data:any;
  update:boolean=false;
  constructor(private router:Router, private service:DepartmentService,private formBuilder:FormBuilder,private compService:CompanyService){

  }
  ngOnInit(): void {
    this.setEditedData();
    this.getCompany();
    
    this.registrationForm=this.formBuilder.group({
      name:['', Validators.required ],
      manager:['', Validators.required ],
      description:['', Validators.required ],
      company:['',Validators.required]

      
    })
  }
  
  reset(){
    this.registrationForm.reset();
  }
  
  setEditedData(){
    this.id=parseInt(sessionStorage.getItem("departmentId"))
    sessionStorage.removeItem("departmentId");
       
    if(this.id){
      this.update=true;
this.service.getDepartmentById(this.id).subscribe(resp=>{
  this.data=resp;
  console.log(this.data);
  
  this.registrationForm.controls['name'].setValue(this.data.name);
  this.registrationForm.controls['manager'].setValue(this.data.manager);
  this.registrationForm.controls['description'].setValue(this.data.description);
  
  this.registrationForm.controls['company'].setValue(this.data.companyName);


});

    }
  }
  updateInfo(){
    if(this.registrationForm.valid){
      
      console.log(this.registrationForm.value.name)
      const data:Department={
    id:this.id,name:this.registrationForm.value.name,
    manager:this.registrationForm.value.manger,
    description:this.registrationForm.value.description,
    companyId:21,companyName:""
  }
  this.service.updateDepartment(data,this.id).subscribe(resp=>{
 
    this.update=false
    alert("SuccessFull")
});
  
}else{
  alert("Some Thing went wrong!!!");
}
}
  addNew(){

    if(this.registrationForm.valid){
      this.getLastId();
      this.lastId++
      const data:Department={
    id:this.lastId,name:this.registrationForm.value.name,manager:this.registrationForm.value.manager,
       description:this.registrationForm.value.description,
       companyId:21,
       companyName:""
  }
       this.service.createDepartment(data).subscribe(resp=>{
       
      alert("SuccessFull")
});

}
else{
  alert("Something went wrong")
}
  }
  companyData: any;
  companyName: any[] = [];
  cLength: number;
  getCompany() {
    this.compService.getCompany().subscribe((resp) => {
      this.companyData = resp;
      this.cLength = resp.length;
      for (let i = 0; i < this.cLength; i++) {
        this.companyName.push(resp[i].companyName);
      }
     console.log(this.companyData)
     
    });
    
  }
  lastId:any;
  totalData:any; 
    getLastId(){ // Id Auto Increment
      this.service.getDepartment().subscribe(resp=>{
  console.log(resp);
  this.totalData=resp;
  this.lastId=resp[resp.length-1].id;
  
      })
      
    }
}
