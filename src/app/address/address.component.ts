import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceTemplateService } from '../service-template.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  userdetails :any = {}
  constructor(private service:ServiceTemplateService,private router:Router) {
      if(!localStorage["token"]){
        this.router.navigate(["/login"])
      }
      else if(!this.service.cartitems){
        this.router.navigate(["/cart"])
      }
   }

  addAddress(){
    this.service.useraddress = this.userdetails
    this.router.navigate(['/checkout/payment'])
  }


  ngOnInit(): void {
  }

}
