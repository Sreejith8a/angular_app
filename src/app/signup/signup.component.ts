import { Component, OnInit } from '@angular/core';
import { ServiceTemplateService } from '../service-template.service'
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup,Validators } from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm : any
  constructor(private signupservice: ServiceTemplateService, private http: HttpClient,private formbuilder:FormBuilder,private toaster:ToastrService,private router:Router) { 
    this.signupForm = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      name:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  userdetails : any ={
    email: "",
    name : "",
    password: ""
  }
  
  user: any = []
  errorResponse : any
  

  submitted(){
      var url = "https://apifromashu.herokuapp.com/api/register"
     
      this.user = this.signupservice.submitted(this.userdetails,this.user)

      this.http.post(url,this.userdetails).subscribe({
         next:(response:any)=>{
           console.log("Signup details posted successfully")
           console.log(response)
           if(response.message == "User Already Exists"){
             this.errorResponse = "User Already Exists"
           }else{
             this.toaster.success('Verify your mail and login')
             this.router.navigate(['/login'])
           }
         },
         error:(error)=>{
           console.log("Error on posting")
         }
      })
  }

  

  

  ngOnInit(): void {
  }

}
