import { Person } from "./person";


export interface Candidate extends Person{
    id:number;
    resume:string;
    status:string;// new, interview, interview scheduled, hired
    company:string
    }