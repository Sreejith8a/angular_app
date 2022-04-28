import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceTemplateService } from '../service-template.service';

@Component({
  selector: 'app-previousorders',
  templateUrl: './previousorders.component.html',
  styleUrls: ['./previousorders.component.css']
})
export class PreviousordersComponent implements OnInit {
   orderdetails:any = []
  constructor(private service:ServiceTemplateService,private router:Router) {
      if(localStorage["token"]){
      var url = "https://apifromashu.herokuapp.com/api/cakeorders"
      let myheader = new HttpHeaders()
      myheader = myheader.append("authtoken",localStorage["token"])
      var options ={
        headers :myheader
      }
      var body = {}

      this.service.getpreviousorders(url,body,options).subscribe({
        next:(response:any)=>{
          console.log("Response is ",response.cakeorders)
          this.orderdetails = response.cakeorders
        },
        error:(error:any)=>{
          console.log("Error occured",error)
        }
      })
   }
   else{
    console.log("not logged in")
    this.router.navigate(["/login"])
   }
  }

  ngOnInit(): void {
  }

}
