import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faSearch, faCartShopping, faSignOut, faBoxArchive,faSignIn,faCake,faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ServiceTemplateService } from '../service-template.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  length:any
  brand_name : String = "Kitchen Story";
  searchval : any 
  isloggedin:any

  faSearch:any = faSearch
  faCartShopping:any = faCartShopping
  faSignOut:any = faSignOut
  faBoxArchive : any = faBoxArchive
  faSignIn:any = faSignIn
  faCake:any  = faCake
  faUserPlus:any = faUserPlus
  isAdmin: any = false
  adminUser : any = ["sreejith8a@gmail.com"]

  search(){
    this.route.navigate(["/search"],{queryParams:{q:this.searchval}})
    
  }

  logout(){
    localStorage.clear()
    this.route.navigate(["/"])
    console.log("Logged out successfully")

  }
  constructor(private route:Router,private service: ServiceTemplateService) {
    this.isloggedin=localStorage["token"]?true:false
    if(this.isloggedin){
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
          this.length = response.data?.length
          console.log(this.length)
        },
        error:(error:any)=>{
          console.log("Error from api",error)
        }
      })
    }
  }
   
  ngDoCheck(){
    if(localStorage["token"]){
      this.isloggedin = true
      if(this.adminUser.includes(localStorage["loggedinUser"])){
        this.isAdmin = true
        this.length = this.service.cartitems?.length
      }
    }
    else{
      this.isloggedin = false
      this.isAdmin = false
    }
  }
  ngOnInit(): void {
  }

}
