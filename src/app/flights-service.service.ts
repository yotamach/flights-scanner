import {
  Injectable
} from '@angular/core';
import {
  Flight
} from './models/flight.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsServiceService {
  private ObservableList: BehaviorSubject<Flight[]> = new BehaviorSubject([]);
  private flightsList: Flight[] = [];
  
  get observableList(): Observable<Flight[]> { return this.ObservableList.asObservable() }

  constructor() {
    this.flightsList.push({
      fromLocation: 'Israel',
      toLocation: 'UAE',
      departureDate: new Date('2020/09/09 09:40'),
      returnDate: new Date('2020/09/12 11:15'),
      numOfConnections: 0,
      price: 1000
    }, {
      fromLocation: 'Israel',
      toLocation: 'Thailand',
      departureDate: new Date('2020/10/09 13:00'),
      returnDate: new Date('2020/10/21 06:00'),
      numOfConnections: 1,
      price: 400
    }, {
      fromLocation: 'UAE',
      toLocation: 'China',
      departureDate: new Date('2020/09/12 00:10'),
      returnDate: new Date('2020/10/01 13:30'),
      numOfConnections: 2,
      price: 100
    }, {
      fromLocation: 'Canada',
      toLocation: 'USA',
      departureDate: new Date('2020/12/31 00:15'),
      returnDate: new Date('2021/01/07 13:10'),
      numOfConnections: 1,
      price: 1200
    }, {
      fromLocation: 'Mexico',
      toLocation: 'Israel',
      departureDate: new Date('2021/01/09 03:10'),
      returnDate: new Date('2021/01/21 17:40'),
      numOfConnections: 2,
      price: 1450
    }, {
      fromLocation: 'Brasil',
      toLocation: 'Italy',
      departureDate: new Date('2021/11/03 04:10'),
      returnDate: new Date('2020/11/08 13:30'),
      numOfConnections: 1,
      price: 1100
    }, {
      fromLocation: 'France',
      toLocation: 'Italy',
      departureDate: new Date('2020/10/22 12:10'),
      returnDate: new Date('2020/10/24 18:35'),
      numOfConnections: 0,
      price: 200
    }, {
      fromLocation: 'United Kingdom',
      toLocation: 'Belguim',
      departureDate: new Date('2020/11/09 07:05'),
      returnDate: new Date('2020/11/11 20:55'),
      numOfConnections: 0,
      price: 350
    }, {
      fromLocation: 'Russia',
      toLocation: 'Uzbekistan',
      departureDate: new Date('2021/02/02 02:10'),
      returnDate: new Date('2020/02/10 14:45'),
      numOfConnections: 1,
      price: 900
    }, {
      fromLocation: 'India',
      toLocation: 'Russia',
      departureDate: new Date('2021/03/22 00:10'),
      returnDate: new Date('2021/04/11 13:30'),
      numOfConnections: 1,
      price: 850
    }, {
      fromLocation: 'India',
      toLocation: 'Indonesia',
      departureDate: new Date('2021/11/25 12:15'),
      returnDate: new Date('2020/11/30 13:30'),
      numOfConnections: 1,
      price: 450
    }, {
      fromLocation: 'Spain',
      toLocation: 'Croatia',
      departureDate: new Date('2021/04/02 09:10'),
      returnDate: new Date('2021/04/09 16:30'),
      numOfConnections: 2,
      price: 150
    }, {
      fromLocation: 'Spain',
      toLocation: 'Israel',
      departureDate: new Date('2020/11/02 12:55'),
      returnDate: new Date('2020/11/11 15:30'),
      numOfConnections: 0,
      price: 250
    }, {
      fromLocation: 'United Kingdom',
      toLocation: 'New Zealand',
      departureDate: new Date('2020/12/22 19:10'),
      returnDate: new Date('2021/01/01 16:30'),
      numOfConnections: 3,
      price: 1500
    }, {
      fromLocation: 'Iran',
      toLocation: 'Turkey',
      departureDate: new Date('2021/09/12 00:10'),
      returnDate: new Date('2021/09/17 13:30'),
      numOfConnections: 0,
      price: 200
    }, {
      fromLocation: 'Greece',
      toLocation: 'Romania',
      departureDate: new Date('2021/05/12 00:10'),
      returnDate: new Date('2021/05/16 13:30'),
      numOfConnections: 0,
      price: 120
    }, {
      fromLocation: 'Hongaria',
      toLocation: 'Poland',
      departureDate: new Date('2021/09/12 00:10'),
      returnDate: new Date('2021/10/01 13:30'),
      numOfConnections: 0,
      price: 50
    }, {
      fromLocation: 'Germany',
      toLocation: 'Bolivia',
      departureDate: new Date('2021/07/12 00:10'),
      returnDate: new Date('2021/07/17 13:30'),
      numOfConnections: 2,
      price: 1250
    }, {
      fromLocation: 'Argentina',
      toLocation: 'South africa',
      departureDate: new Date('2020/11/12 00:10'),
      returnDate: new Date('2020/11/22 13:30'),
      numOfConnections: 1,
      price: 950
    });
  }

  getFlights() {
    this.ObservableList.next(this.flightsList);
  }

  searchFlights(
    filter: {
      fromLocation ? : string;
      toLocation ? : string;
      departureDate ? : Date;
      returnDate ? : Date;
      numOfConnections ? : number;
    }) {
    const results = this.flightsList.filter(function(item) {
      for (var key in filter) {
        if (item[key] !== filter[key])
          return false;
      }
      return true;
    });
    this.ObservableList.next(results);
  }
}
