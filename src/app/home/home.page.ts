import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public searchTerm = '';
  public items: any;

  searching: any = false;

  public searchControl: FormControl;

  constructor(private dataService: DataService) {

    this.searchControl = new FormControl();

  }

  ngOnInit() {
    this.setFilteredItems('');

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.searching = false;
        this.setFilteredItems(search);
      });
  }

  onSearchInput() {
    this.searching = true;
}


  setFilteredItems(searchTerm) {
    this.items = this.dataService.filterItems(searchTerm);
  }

}
