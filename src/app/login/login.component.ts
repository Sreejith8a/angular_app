import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ServiceTemplateService } from '../service-template.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router,private toastr: ToastrService,private loader: NgxUiLoaderService,private service: ServiceTemplateService) { }
  errorResponse : any
  userdetails: any ={

  }

  login(){
    var url ="https://apifromashu.herokuapp.com/api/login"
    this.http.post(url,this.userdetails).subscribe({
    next:(response:any)=>{
      console.log(response.token)
      if(response.token){
        localStorage["token"]=response.token
        this.loader.start()
        localStorage["loggedinUser"] = response.email
        this.toastr.success(`Hello ${response.name}`);

        var url = "https://apifromashu.herokuapp.com/api/cakecart"
        var myheader = new HttpHeaders()
        myheader = myheader.append("authtoken",localStorage["token"])
        var body = {}
        var options = {
          headers: myheader
        }
        this.service.getCartItems(url,body,options).subscribe({
          next:(response:any)=>{
            console.log("Response from cart items api",response)
            this.service.cartitems = response.data
           
          },
          error:(error:any)=>{
            console.log("Error from api",error)
          }
        })

        this.router.navigate(["/"])
        this.loader.stop()
      }
      else{
        console.log("Invalid credentials")
        this.errorResponse = "Invalid credentials" 
      }
    },
      error:(error)=>{
        console.log("Error on login")
    }
    })
  }

  ngOnInit(): void {
  }

}
