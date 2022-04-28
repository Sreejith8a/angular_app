import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceTemplateService {
  useraddress:any
  loggedinUser:any
  cartitems:any 
  price:any

  ascending(data:any){
    data.sort((ob1:any,ob2:any)=>{
      return ob1.price-ob2.price
    })
    return data
  }

  descending(data:any){
    data.sort((ob1:any,ob2:any)=>{
      return ob2.price-ob1.price
    })
    return data
  }

  submitted(userdetails:any,user:any){
     var temp = {...userdetails}
     user.push(temp)
     return user
  }

  deleteuser(i:any,user:any){
    delete user[i]
    return user
  }

  getCakedetails(url:any){
     return this.http.get(url)
  }


  searchcake(url:any){
    return this.http.get(url)
  }

  getCartItems(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  postcartdetails(url:any,body:any,options:any){
   
    return this.http.post(url,body,options)

  }


  


  placeorder(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  getpreviousorders(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  removecake(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  alter_quantity(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  uploadimage(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }

  addcake(url:any,body:any,options:any){
    return this.http.post(url,body,options)
  }
  
  constructor(private http: HttpClient) { }
}
