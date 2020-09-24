import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FlightsServiceService } from 'src/app/flights-service.service';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  disableConnectionsChoose: boolean = true;
  enablePricesFilterChoose: boolean = false;
  disableSubmit: boolean = true;
  searchFlightForm = this.fb.group({
    fromLocation: [''],
    toLocation: [''],
    departureDate: [''],
    returnDate: [''],
    isConnections: [false],
    numOfConnections: [0],
    isPricesFilter: [false],
    pricesFilter: [[0,100]]
  });

  minPrice: number = 0;
  maxPrice: number = 100;
  pricesFilterOptions: Options = {
    floor: 0,
    ceil: 5000,
    step: 10,
    showTicks: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  constructor(private fb: FormBuilder, private flightsServiceService: FlightsServiceService) { }

  ngOnInit(): void {
    this.searchFlightForm.valueChanges.subscribe(() => {
      this.checkValid();
    });
  }

  onSubmit(): void {
    let filter = {...this.searchFlightForm.value};
    this.clean(filter);
    if(this.searchFlightForm.value.isPricesFilter) {
      const priceRange = {
        minPrice: this.searchFlightForm.value.pricesFilter[0],
        maxPrice: this.searchFlightForm.value.pricesFilter[1]
      };
      this.flightsServiceService.searchFlights(filter,priceRange);
    } else {
      this.flightsServiceService.searchFlights(filter);
    }
    this.searchFlightForm.reset();
    this.disableSubmit = true;
  }

  clean(obj) : void {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
    delete obj['pricesFilter'];
    delete obj['isConnections'];
    delete obj['isPricesFilter'];
  }

  checkValid() {
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
  enablePricesFilter(): void {
    this.enablePricesFilterChoose = this.searchFlightForm.value.isPricesFilter;
  }

}
