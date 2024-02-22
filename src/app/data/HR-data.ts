import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Company } from '../models/company';
import { Department } from '../models/department';
import { Candidate } from '../models/candidate';
import { Salary } from '../models/salary';
import { Employee } from '../models/employee';

export class EmployeeData implements InMemoryDbService {
  createDb() {
    const company:Company[]=[
      { id:1,companyName:"Software Company", companyAddress:"Addis Ababa",
      description:"descriptions",companyStatus:"Active",companyIndustry:"Technology",companySize:4500,establishmentDate:"2023-08-15"},
      { id:2,companyName:"Health Science", companyAddress:"Canada",
      description:"descriptions",companyStatus:"Active",companyIndustry:"HealthCare",companySize:400,establishmentDate:"2023-08-15"},
    ]

    const employees: Employee[] = [
      { id: 1, firstName: 'john', email: 'john@gmail.com', deptName: 'Software',status:"Active"
      ,position:"Security",dateOfBirth:"2000-08-25",level:"Senior",phone:454645454,employmentDate:"2023-08-25",
      lastName:"Tefera",address:"Hawassa",education:"Diploma",company:"Software Company"},

      { id: 2, firstName: 'jane', email: 'jane@yahoo.com', deptName: 'Computer' ,status:"On live"
      ,position:"Customer Service",dateOfBirth:"2000-08-25",level:"Senior",phone:454645454,employmentDate:"2023-08-25",
      lastName:"Tefera",address:"Hawassa",education:"Degree",company:"Software Company"},
      { id: 3, firstName: 'kane', email: 'Kane@rediff.com', deptName: 'Software',status:"Active" 
      ,position:"Development",dateOfBirth:"2000-08-25",level:"Junior",phone:454645454,employmentDate:"2023-08-25",
      lastName:"Tefera",address:"Hawassa",education:"Degree",company:"Software Company"},

      { id: 4, firstName: 'sem', email: 'sem@gmail.com', deptName: 'Computer' ,status:"Terminated"
      ,position:"Security",dateOfBirth:"2000-08-25",level:"Junior",phone:454645454,employmentDate:"2023-08-25",
      lastName:"Tefera",address:"Hawassa",education:"Masters",company:"Software Company"},

      { id: 5, firstName: 'Abe', email: 'abe@yahoo.com', deptName: 'Computer',status:"Active"
       ,position:"Customer Service",dateOfBirth:"2000-08-25",level:"Manager",phone:454645454,employmentDate:"2023-08-25",
      lastName:"Tefera",address:"Hawassa",education:"Masters",company:"Software Company"},

      { id: 6, firstName: 'Alex', email: 'gech@rediff.com', deptName: 'Software' ,status:"Terminated"
      ,position:"Development",dateOfBirth:"2000-08-25",level:"Manager",phone:454645454,employmentDate:"2023-08-25",
      lastName:"Tefera",address:"Hawassa",education:"Master",company:"Software Company"},

      { id: 6, firstName: 'Mamaru', email: 'Mamaru@gmail.com', deptName: 'Software' ,status:"Terminated"
      ,position:"Development",dateOfBirth:"2000-08-25",level:"Manager",phone:454645454,employmentDate:"2023-08-25",
      lastName:"Tefera",address:"Hawassa",education:"Master",company:"Software Company"},
      
    ];

    const departments: Department[] = [
      { id: 1, name: 'Software',manager:'Congo',description:"sample description" ,companyId:1,companyName:"Software Company"},
      { id: 2, name: 'Computer',manager:'abe',description:"sample description",companyId:2,companyName:"Health Science" },
      { id: 3, name: 'Software',manager:'Congo',description:"sample description",companyId:2,companyName:'Health Science'},
      { id: 4, name: 'Computer',manager:'Congo',description:"sample description" ,companyId:1,companyName:'Software Company'},
    ];

    const candidates:Candidate[]=[
      {id:1,firstName:"Melkamu",lastName:"Abera",phone:9876567887,address:"Woliso",
      dateOfBirth:"2013-01-15",email:"melaku@gmail.com",education:"Bachelors",
      resume:"grade two",status:"New",company:"Health Science"},

      {id:2,firstName:"Melkamu",lastName:"Abera",phone:9876567887,address:"Woliso",
      dateOfBirth:"2013-01-15",email:"melaku@gmail.com",education:"Bachelors",
      resume:"grade two",status:"New",company:"Software Company"},

      {id:3,firstName:"Melkamu",lastName:"Abera",phone:9876567887,address:"Woliso",
      dateOfBirth:"2013-01-15",email:"melaku@gmail.com",education:"Bachelors",
      resume:"grade two",status:"New",company:"Health Science"},

      {id:4,firstName:"Melkamu",lastName:"Abera",phone:9876567887,address:"Woliso",
      dateOfBirth:"2013-01-15",email:"melaku@gmail.com",education:"Bachelors",
      resume:"grade two",status:"New",company:"Software Company"}
    ]

    const salary:Salary[]=[
      {id:1,level:'Junior',salary:23456,employeeName:"john@gmail.com",effectiveDate:"2023-08-17"},
      {id:2,level:'Senior',salary:23456,employeeName:"jane@yahoo.com",effectiveDate:"2023-08-17"},
      {id:3,level:'Junior',salary:23456,employeeName:"Kane@rediff.com",effectiveDate:"2023-08-17"},
      {id:4,level:'Manager',salary:23456,employeeName:"abe@yahoo.com",effectiveDate:"2023-08-17"},
      {id:5,level:'Junior',salary:23456,employeeName:"sem@gmail.com",effectiveDate:"2023-08-17"},
      {id:6,level:'Junior',salary:23456,employeeName:"gech@rediff.com",effectiveDate:"2023-08-17"},
      {id:7,level:'Associate',salary:23456,employeeName:"Mamaru@gmail.com",effectiveDate:"2023-08-17"},
        ]
   



    return {employees,departments,company,candidates,salary}
   
  }
}
