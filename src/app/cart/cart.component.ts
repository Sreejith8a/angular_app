import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CakedetailComponent } from '../cakedetail/cakedetail.component';
import { ServiceTemplateService } from '../service-template.service';
import { faTrash,faPlus,faMinus} from '@fortawesome/free-solid-svg-icons'
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartitems :any =[]
  totalprice :any = 0
  faTrash :any = faTrash
  faPlus:any = faPlus
  faMinus:any = faMinus
  
  constructor(private service:ServiceTemplateService,private router:Router,private loader:NgxUiLoaderService) { 
    if(localStorage["token"]){
    var url = "https://apifromashu.herokuapp.com/api/cakecart"
    let myheader = new HttpHeaders()
    myheader = myheader.append("authtoken",localStorage["token"])
    var options ={
      headers :myheader
    }
    var body = {}
    this.loader.start()
    this.service.getCartItems(url,body,options).subscribe({
      next:(response:any)=>{
        console.log("Response from cart api",response.data)
        this.cartitems = response.data
        this.cartitems.forEach((eachitem:any) => {
           this.totalprice = this.totalprice + (eachitem.price*eachitem.quantity)
        });
        this.loader.stop()
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

  removeFromCart(index:any){
    console.log("Item will be removed soon")
    var url = "https://apifromashu.herokuapp.com/api/removecakefromcart"
    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken",localStorage["token"])
    var options ={
      headers :myheaders
    }
    var body = {cakeid:this.cartitems[index].cakeid}

    this.service.removecake(url,body,options).subscribe({
       next:(response:any)=>{
         console.log("Response is ",response)
         if(response.message=="Removed whole cake  item from cart"){
           this.totalprice = this.totalprice - (this.cartitems[index].quantity*this.cartitems[index].price)
           this.cartitems.splice(index,1)
         }
       },
       error:(error:any)=>{
         console.log("Error Occured ",error)
       }
    })

  }


  increaseQuantity(index:any){
    console.log("Quantity will be increased")
    var url = "https://apifromashu.herokuapp.com/api/addcaketocart"
    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken",localStorage["token"])
    var options ={
      headers :myheaders
    }
    var body = {
      name: this.cartitems[index].name,
      cakeid: this.cartitems[index].cakeid,
      price: this.cartitems[index].price,
      image: this.cartitems[index].image,
      weight: this.cartitems[index].weight
    } 

    this.service.alter_quantity(url,body,options).subscribe({
      next:(response:any)=>{
        console.log("Response is ",response)
        this.cartitems[index].quantity+=1
        this.totalprice += this.cartitems[index].price
      },
      error:(error:any)=>{
        console.log("Error from api ", error)
      }
    })

  }

  decreaseQuantity(index:any){
    console.log("Quantity will be decreased")
    var url = "https://apifromashu.herokuapp.com/api/removeonecakefromcart"
    let myheaders = new HttpHeaders()
    myheaders = myheaders.append("authtoken",localStorage["token"])
    var options ={
      headers :myheaders
    }
    var body = {
      cakeid:this.cartitems[index].cakeid
    } 

    this.service.alter_quantity(url,body,options).subscribe({
      next:(response:any)=>{
        console.log("Response is ",response)
        this.cartitems[index].quantity-=1
        this.totalprice -= this.cartitems[index].price
      },
      error:(error:any)=>{
        console.log("Error occured ", error)
      }
    })
  }


  checkout(){
    this.service.cartitems = this.cartitems
    this.service.price = this.totalprice
    this.router.navigate(["/checkout"])
  }
  
  ngOnInit(): void {
  }

}
