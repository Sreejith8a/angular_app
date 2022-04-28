// import { HttpHeaders } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { ServiceTemplateService } from '../service-template.service';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css']
// })
// export class PaymentComponent implements OnInit {

  
//   cartitems :any = []
//   totalprice :any 
//   useraddress :any ={}
//   constructor(private service:ServiceTemplateService,private router:Router,private toaster:ToastrService) { 
      
//         var url = "https://apifromashu.herokuapp.com/api/cakecart"
//         let myheader = new HttpHeaders()
//         myheader = myheader.append("authtoken",localStorage["token"])
//         var options ={
//           headers :myheader
//         }
//         var body = {}
        
//         this.service.getCartItems(url,body,options).subscribe({
//           next:(response:any)=>{
//             console.log("Response from cart api",response.data)
//             this.cartitems = response.data
//             this.cartitems.forEach((eachitem:any) => {
//                this.totalprice = this.totalprice + (eachitem.price*eachitem.quantity)
//             });
//             this.useraddress = this.service.useraddress
//           },
//           error:(error:any)=>{
//             console.log("Error occured",error)
//           }
//         })
//    }


//    placeorder(){
//     let myheaders = new HttpHeaders()
//     myheaders = myheaders.append("authtoken",localStorage["token"])
//     var url = "https://apifromashu.herokuapp.com/api/addcakeorder"
//     var options ={
//       headers :myheaders
//     }
//     var body = {
//         cakes: this.cartitems,
//         price: this.totalprice,
//         name: this.useraddress.name,
//         address: this.useraddress.address,
//         city: this.useraddress.city,
//         pincode: this.useraddress.pincode,
//         phone:this.useraddress.phone
//     }
    
//     this.service.placeorder(url,body,options).subscribe({
//       next:(response:any)=>{
//         console.log(this.useraddress)
//         console.log("response is",response)
//         this.toaster.info("Order Placed")
//         this.router.navigate(["/previousorders"])
//       },
//       error:(error:any)=>{
//         console.log("error occured",error)
//       }
//     })
//    }

//   ngOnInit(): void {
//   }

// }


import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceTemplateService } from '../service-template.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  
  cartitems :any = []
  totalprice :any = 0
  useraddress :any ={}
  constructor(private service:ServiceTemplateService,private router:Router,private toaster:ToastrService) { 
    var url = "https://apifromashu.herokuapp.com/api/cakecart"
    let myheader = new HttpHeaders()
    myheader = myheader.append("authtoken",localStorage["token"])
    var options ={
      headers :myheader
    }
    var body = {}
    
    this.service.getCartItems(url,body,options).subscribe({
      next:(response:any)=>{
        console.log("Response from cart api",response.data)
        this.cartitems = response.data
        this.cartitems.forEach((eachitem:any) => {
           this.totalprice = this.totalprice + (eachitem.price*eachitem.quantity)
        });
        this.useraddress = this.service.useraddress
      },
      error:(error:any)=>{
        console.log("Error occured",error)
      }
    })
   }


   placeorder(){
    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken",localStorage["token"])
    var url = "https://apifromashu.herokuapp.com/api/addcakeorder"
    var options ={
      headers :myheaders
    }
    var body = {
        cakes: this.cartitems,
        price: this.totalprice,
        name: this.useraddress.name,
        address: this.useraddress.address,
        city: this.useraddress.city,
        pincode: this.useraddress.pincode,
        phone:this.useraddress.phone
    }
    
    this.service.placeorder(url,body,options).subscribe({
      next:(response:any)=>{
        console.log(this.useraddress)
        console.log("response is",response)
        if(response.messageg=="order placed"){
          this.router.navigate(['/previousorders'])
          this.toaster.info("Order Placed")
        }
        else{
          this.toaster.error("Insufficient Details")
        }
      },
      error:(error:any)=>{
        console.log("error occured",error)
      }
    })
   }




  ngOnInit(): void {
  }

}
