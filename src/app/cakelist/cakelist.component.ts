import { Component, OnInit } from '@angular/core';
import { ServiceTemplateService } from '../service-template.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-cakelist',
  templateUrl: './cakelist.component.html',
  styleUrls: ['./cakelist.component.css']
})
export class CakelistComponent implements OnInit {

  constructor(private sortservice: ServiceTemplateService, private http : HttpClient) { 
      var url = "https://apifromashu.herokuapp.com/api/allcakes"
      this.http.get(url).subscribe({
        next:(response:any)=>{
          console.log("Respose from all cakes api")
          this.cakes = response.data
        },
        error:(error)=>{
          console.log("Error from all cake api")
        }
      })
  }
  
cakes : any =[]
 /* {
    name:"cake1",image:"assets/chocolate.jpg",price:500
  },
  {
    name:"cake2",image:"assets/chocolatecake-2.jpg",price:200
  },
  {
    name:"cake3",image:"assets/cupcake.jpg",price:300
  },
  {
    name:"cake4",image:"assets/weirdcake.jpg",price:550
  },
  {
    name:"cake5",image:"assets/chocolate.jpg",price:800
  },
  {
    name:"cake6",image:"assets/chocolatecake-2.jpg",price:470
  },
]*/


  ascending(){
     this.cakes= this.sortservice.ascending(this.cakes)
  }

  descending(){
     this.cakes = this.sortservice.descending(this.cakes)
  }

  
  ngOnInit(): void {
  }

}
