import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Country} from '../view-models/country';
import { AppDataService} from '../services/app-data.service';


@Component({
  selector: 'app-showCountryDetailcountry-maint',
  templateUrl: './country-maint.component.html',
  styleUrls: ['./country-maint.component.css']
})
export class CountryMaintComponent implements OnInit {
  countries: Array<Country>;
  deleteError: String;
  deleteId: Number;
  isDeleting = false;

// check for errors when subscribing
  constructor(private dataService: AppDataService,
              private router: Router) {
      dataService.getCountries().subscribe((data)=> this.countries = data);
               }

  ngOnInit() {
  }
 

  
  cancelDelete() {
    this.isDeleting = false;
    this.deleteId = null;
  }

  deleteCountryQuestion(id: number) {
  this.deleteError=null;
  this.deleteId=id;
}
  deleteCountry(id: number){
    this.isDeleting=true;
    this.dataService.deleteCountry(id).subscribe(
      c => this.cancelDelete(),
      err=> { this.deleteError = err; this.isDeleting=false}
    );
  }

  editCountry(id:number){
   this.router.navigate(['/authenticated/country-detail',id ,'edit'])
 }

  createCountry(){
    this.router.navigate(['/authenticated/country-detail', 0 ,'create']);
  }



  showCountryDetail(id:number){
  this.router.navigate(['authenticated/country-detail', id,'details']);
}

}
