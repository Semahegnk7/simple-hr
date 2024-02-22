import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Salary } from 'src/app/models/salary';
import { SalaryService } from 'src/app/services/salary.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-salary-add',
  templateUrl: './salary-add.component.html',
  styleUrls: ['./salary-add.component.scss']
})
export class SalaryAddComponent implements OnInit{
  dataSource= new MatTableDataSource<Salary>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  registrationForm:FormGroup;
  isSuccess:boolean=false;
  id:number;
  data:any;
  update:boolean=false;
  constructor(private router:Router, private service:SalaryService,
     private empService:EmployeeService,private formBuilder:FormBuilder){

      this.getSalary();
  }
  ngOnInit(): void {
    
    this.setEditedData();
    this. getEmployee();
    this.registrationForm=this.formBuilder.group({
      level:['', Validators.required ],
      employeeName:['', Validators.required ],
      effectiveDate:['', Validators.required ],
      salary:['', Validators.required ],
    })
  }
  reset(){
    this.registrationForm.reset();
  }
  setEditedData(){
    this.id=parseInt(sessionStorage.getItem("salaryId"))
    sessionStorage.removeItem("salaryId");
    
    if(this.id){
      this.update=true;
this.service.getSalaryById(this.id).subscribe(resp=>{
  this.data=resp;
  
  this.registrationForm.controls['level'].setValue(this.data.level);
  this.registrationForm.controls['employeeName'].setValue(this.data.employeeName);
  this.registrationForm.controls['effectiveDate'].setValue(this.data.effectiveDate);
  this.registrationForm.controls['salary'].setValue(this.data.salary);
});

    }
  }
  updateInfo(){
    if(this.registrationForm.valid){
      
      console.log(this.registrationForm.value.name)
      const data:Salary={
        id: this.id,
        level:this.registrationForm.value.level,
    employeeName:this.registrationForm.value.employeeName,
    effectiveDate:this.registrationForm.value.effectiveDate,
    salary:this.registrationForm.value.salary,
   }
  this.service.updateSalary(data,this.id).subscribe(resp=>{
 
    alert("SuccessFull")
    this.update=false;
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
      const data:Salary={
        id: this.lastId,
        level:this.registrationForm.value.level,
    employeeName:this.registrationForm.value.employeeName,
    effectiveDate:this.registrationForm.value.effectiveDate,
    salary:this.registrationForm.value.salary,
  }
       this.service.createSalary(data).subscribe(resp=>{
       
      alert("SuccessFull")
      this.reset();
});

}
else{
  alert("Something went wrong")
}
  }
salary:any[]=[];
salaryLength:number
  getSalary(){
    this.service.getSalary().subscribe(resp=>{
this.salaryLength=resp.length;
for (let i = 0; i < this.salaryLength; i++) {
  this.salary.push(resp[i].employeeName);
}
})
console.log(this.salary)
    
  }
  employeeData: any;
  employeeName: any[] = [];
  cLength: number;
  getEmployee() {
    this.getSalary();
    this.empService.getEmployee().subscribe((resp) => {
      this.employeeData = resp;
      this.cLength = resp.length;
      for (let i = 0; i < this.cLength; i++) {
        this.employeeName.push(resp[i].email);
      }
      
      for (let i = 0; i < this.employeeName.length; i++) {
      
        for (let j = 0; j < this.salary.length; j++) {
          if (this.employeeName[i] === this.salary[j]) {
            console.log(this.employeeName[i]);
            this.employeeName.splice(i, 1);
               
          }
        }
      }
    });

     }

  lastId:any;
totalData:any; 
  getLastId(){ // Id Auto Increment
this.service.getSalary().subscribe(resp=>{
this.totalData=resp;
this.lastId=resp[resp.length-1].id;

    })
    
  }
  
}
