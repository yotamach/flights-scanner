import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FlightsServiceService } from './../../../flights-service.service';
import { Flight } from './../../../models/flight.model';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit, OnDestroy {
  flightsList: Flight[] = [];
  flightsListSubs: Subscription;
  constructor(private flightsServiceService: FlightsServiceService) { }
  moment: any = moment;
  displayedColumns: string[] = ['fromLocation', 'toLocation', 'departureDate', 'returnDate','numOfConnections', 'price'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource();
  ngOnInit() {
    this.flightsListSubs = this.flightsServiceService.observableList.subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      
    });
    this.flightsServiceService.getFlights();

  }

  ngOnDestroy() {
    this.flightsListSubs.unsubscribe();
  }

}
