import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FlightsServiceService } from 'src/app/flights-service.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  disableConnectionsChoose: boolean = true;
  disableSubmit: boolean = true;
  searchFlightForm = this.fb.group({
    fromLocation: [''],
    toLocation: [''],
    departureDate: [''],
    returnDate: [''],
    isConnections: [false],
    numOfConnections: [0]
  });
  constructor(private fb: FormBuilder, private flightsServiceService: FlightsServiceService) { }

  ngOnInit(): void {
    this.searchFlightForm.valueChanges.subscribe(() => {
      this.checkValid();
    });
  }

  onSubmit(): void {
    let filter = {...this.searchFlightForm.value};
    this.clean(filter);
    delete filter["isConnections"];
    this.flightsServiceService.searchFlights(filter);
    this.searchFlightForm.reset();
    this.disableSubmit = true;
  }

  clean(obj) : void {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
  }

  checkValid() {
    console.log(this.searchFlightForm.value);
    if(
        this.searchFlightForm.value.fromLocation === "" &&
      this.searchFlightForm.value.toLocation === "" &&
      this.searchFlightForm.value.departureDate === "" &&
      this.searchFlightForm.value.returnDate === "")
    {
      this.disableSubmit = true;
    } else {
      this.disableSubmit = false;
    }
  }

  autoTicks = true;
  disabled = false;
  invert = false;
  max = 5;
  min = 1;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  enableNumOfConnections(): void {
    this.disableConnectionsChoose = !this.searchFlightForm.value.isConnections;
  }

}
