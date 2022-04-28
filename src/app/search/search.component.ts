import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceTemplateService } from '../service-template.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchresult:any =[]
  constructor(private route:ActivatedRoute,private service:ServiceTemplateService) {
    //var searchtext = this.route.snapshot.queryParams["q"]
    this.route.queryParams.subscribe((query:any)=>{
      var searchtext = query["q"]
      var url = "https://apifromashu.herokuapp.com/api/searchcakes?q="+searchtext
      this.service.searchcake(url).subscribe({
      next:(response:any)=>{
        console.log("Response from search cake api",response)
        this.searchresult = response.data
      },
      error:(error)=>{
        console.log("Error from search cake api",error)
      }
    })
  })
    
   }

  ngOnInit(): void {
  }

}
