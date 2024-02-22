import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.scss']
})
export class SidbarComponent  implements OnInit{
  url:string;
  constructor(private routers:Router){
   
    
     }
  changeUrl(url:any){
    this.url=url;
  }
  ngOnInit(): void {
    
setTimeout(() => {
  this.url=this.routers.url; 
}, 100);
}

}
