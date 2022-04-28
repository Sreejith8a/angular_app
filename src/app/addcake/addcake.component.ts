import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceTemplateService } from '../service-template.service';

@Component({
  selector: 'app-addcake',
  templateUrl: './addcake.component.html',
  styleUrls: ['./addcake.component.css']
})
export class AddcakeComponent implements OnInit {
  file:any
  imageURL : any
  cakedetails:any = {
    eggless : true
  }
  constructor(private service:ServiceTemplateService,private toastr:ToastrService,private router:Router) { }

  getFile(event:any){
    this.file = event.target.files[0]
  }
  upload(){
    var url = "https://apifromashu.herokuapp.com/api/upload"
    var formdata = new FormData()
    formdata.append("file",this.file) //key informed by backend developer

    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken",localStorage["token"])
    var options ={
      headers :myheaders
    }

    this.service.uploadimage(url,formdata,options).subscribe({
      next:(response:any)=>{
        console.log("Response is ",response)
        this.imageURL = response.imageUrl        
      },
      error:(error:any)=>{
        console.log("Error occured",error)
      }
    })
  }


  addCake(){
    this.cakedetails.ingredients= this.cakedetails.ingredients.split(",")
    this.cakedetails.image = this.imageURL
    console.log(this.cakedetails)
    const url  = "https://apifromashu.herokuapp.com/api/addcake"
    let myheader = new HttpHeaders()
    myheader = myheader.append("authtoken",localStorage["token"])
    var options = {
       headers : myheader
    }

    var body = this.cakedetails

    this.service.addcake(url,body,options).subscribe({
      next:(repsonse:any)=>{
        console.log("Response is ",repsonse)
        if(repsonse.message="Success"){
           this.toastr.info("Cake Added")
           this.router.navigate(['/'])
        }
      },
      error:(error:any)=>{
        console.log("Error occured ", error)
      }
    })
  }
  ngOnInit(): void {
  }

}
