import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceTemplateService } from '../service-template.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cakedetail',
  templateUrl: './cakedetail.component.html',
  styleUrls: ['./cakedetail.component.css']
})
export class CakedetailComponent implements OnInit {
  cakeid : any
  cake : any
  isloggedin:any
  isadded:any
  faCartShopping:any = faCartShopping
  constructor(private route:ActivatedRoute,private service:ServiceTemplateService,private router:Router) { 
    this.cakeid = this.route.snapshot.params["cakeid"]

    var url = "https://apifromashu.herokuapp.com/api/cake/"+this.cakeid
    this.service.getCakedetails(url).subscribe({
      next:(response:any)=>{
        console.log("Response from cake details",response.data)
        this.cake = response.data
      },
      error:(error:any)=>{
        console.log("Error from api")
      }
    })
  }

  addtoCart(){
    
    if(localStorage["token"]){
      this.isadded = true
      let myheader = new HttpHeaders()
      myheader = myheader.append("authtoken",localStorage["token"])
      var url = "https://apifromashu.herokuapp.com/api/addcaketocart"
      var options ={
        headers :myheader
      }
      var body = { cakeid:this.cake.cakeid,
                    name:this.cake.name,
                    price:this.cake.price,
                    image:this.cake.image,
                    weight:this.cake.weight
                  }
      console.log("logged in")
      this.service.postcartdetails(url,body,options).subscribe({
        next:(response:any)=>{
          console.log("response is",response)
          if(response.data){
            this.router.navigate(['/cart'])
          }
        },
        error:(error:any)=>{
          console.log("error occured",error)
        }
      })
    }else{
      console.log("not logged in")
      this.router.navigate(["/login"])
    }
  }

  ngOnInit(): void {
  }

}
