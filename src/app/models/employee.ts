import { Person } from "./person";

export interface Employee extends Person{
    id:number;
    position:string;
    deptName:string;
    employmentDate:string;
    status:string; // active, on live, terminated
    level:string; //junior, senior, manager
    company:string;

}