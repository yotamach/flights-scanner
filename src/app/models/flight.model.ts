export interface Flight {
  fromLocation: string;
  toLocation: string;
  departureDate: Date;
  returnDate: Date;
  numOfConnections: number;
  price: number;
}
