import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsSearchComponent } from './flights-search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatToolbar } from '@angular/material/toolbar';

describe('FlightsSearchComponent', () => {
  let component: FlightsSearchComponent;
  let fixture: ComponentFixture<FlightsSearchComponent>;
  let SearchFormcomponent: SearchFormComponent;
  let SearchFormfixture: ComponentFixture<SearchFormComponent>;
  let ResultsListcomponent: ResultsListComponent;
  let ResultsListfixture: ComponentFixture<ResultsListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        FlightsSearchComponent,
        SearchFormComponent,
        ResultsListComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    SearchFormfixture = TestBed.createComponent(SearchFormComponent);
    SearchFormcomponent = SearchFormfixture.componentInstance;
    SearchFormfixture.detectChanges();

    ResultsListfixture = TestBed.createComponent(ResultsListComponent);
    ResultsListcomponent = ResultsListfixture.componentInstance;
    ResultsListfixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create ResultsListcomponent', () => {
    expect(ResultsListcomponent).toBeTruthy();
  });

  it('should create SearchFormcomponent', () => {
    expect(SearchFormcomponent).toBeTruthy();
  });

  it('should Search botton be disabled on load', () => {
    let submitEL: DebugElement = SearchFormfixture.debugElement.query(By.css('button'));
    expect(submitEL.nativeElement.disabled).toBe(true);
  });

  it('should button be enable after typing on input', () => {
    SearchFormcomponent.searchFlightForm.controls['fromLocation'].setValue('Israel');
    SearchFormcomponent.searchFlightForm.controls['fromLocation'].markAsTouched;
    SearchFormcomponent.checkValid();
    SearchFormfixture.detectChanges();
    let submitEL: DebugElement = SearchFormfixture.debugElement.query(By.css('button'));
    expect(submitEL.nativeElement.disabled).toBe(false);    
  });

  it('should Search "Israel" as from location', () => {
    SearchFormcomponent.searchFlightForm.controls['fromLocation'].setValue('Israel');
    SearchFormcomponent.checkValid();
    SearchFormfixture.detectChanges();
    const fromLocationInput = SearchFormcomponent.searchFlightForm.controls['fromLocation'].value;
    SearchFormcomponent.onSubmit();
    ResultsListfixture.detectChanges();
    const resultsArray = ResultsListcomponent.dataSource.data;
    let rowsResults = resultsArray.every( resultsRow => resultsRow['fromLocation'] === fromLocationInput);
    expect(true).toEqual(rowsResults);
  });

  it('should Search "Romania" as to location', () => {
    SearchFormcomponent.searchFlightForm.controls['toLocation'].setValue('Romania');
    SearchFormcomponent.checkValid();
    SearchFormfixture.detectChanges();
    const toLocationInput = SearchFormcomponent.searchFlightForm.controls['toLocation'].value;
    SearchFormcomponent.onSubmit();
    ResultsListfixture.detectChanges();
    const resultsArray = ResultsListcomponent.dataSource.data;
    let rowsResults = resultsArray.every( resultsRow => resultsRow['toLocation'] === toLocationInput);
    expect(true).toEqual(rowsResults);
  });

  it('should Search "United Kingdom" as from location and "New Zealand" as to location', () => {
    SearchFormcomponent.searchFlightForm.controls['fromLocation'].setValue('United Kingdom');
    SearchFormcomponent.searchFlightForm.controls['toLocation'].setValue('New Zealand');
    SearchFormcomponent.checkValid();
    SearchFormfixture.detectChanges();
    const fromLocationInput = SearchFormcomponent.searchFlightForm.controls['fromLocation'].value;
    const toLocationInput = SearchFormcomponent.searchFlightForm.controls['toLocation'].value;
    SearchFormcomponent.onSubmit();
    ResultsListfixture.detectChanges();
    const resultsArray = ResultsListcomponent.dataSource.data;
    let rowsResultsFrom = resultsArray.every( resultsRow => resultsRow['fromLocation'] === fromLocationInput);
    let rowsResultsTo = resultsArray.every( resultsRow => resultsRow['toLocation'] === toLocationInput);
    expect(true).toEqual(rowsResultsFrom && rowsResultsTo);
  });

  it('should Search by "2021/04/02 09:10" and "2021/04/02 16:30" as specific dates', () => {
    SearchFormcomponent.searchFlightForm.controls['departureDate'].setValue('2021/04/02');
    SearchFormcomponent.searchFlightForm.controls['returnDate'].setValue('2021/04/02');
    SearchFormcomponent.checkValid();
    SearchFormfixture.detectChanges();
    const departureDateInput = SearchFormcomponent.searchFlightForm.controls['toLocation'].value;
    const returnDateInput = SearchFormcomponent.searchFlightForm.controls['toLocation'].value;
    SearchFormcomponent.onSubmit();
    ResultsListfixture.detectChanges();
    const resultsArray = ResultsListcomponent.dataSource.data;
    let departureDateRowsResults = resultsArray.every( resultsRow => resultsRow['departureDate'] === departureDateInput);
    let returnDateRowsResults = resultsArray.every( resultsRow => resultsRow['returnDate'] === returnDateInput);
    expect(true).toEqual(departureDateRowsResults && returnDateRowsResults);
  });

  it('should Search by flights with 2 connections', () => {
    SearchFormcomponent.searchFlightForm.controls['isConnections'].setValue(true);
    SearchFormfixture.detectChanges();
    SearchFormcomponent.searchFlightForm.controls['numOfConnections'].setValue(2);
    SearchFormcomponent.checkValid();
    SearchFormfixture.detectChanges();
    const numOfConnectionsInput = SearchFormcomponent.searchFlightForm.controls['numOfConnections'].value;
    SearchFormcomponent.onSubmit();
    ResultsListfixture.detectChanges();
    const resultsArray = ResultsListcomponent.dataSource.data;
    let numOfConnectionsRowsResults = resultsArray.every( resultsRow => resultsRow['numOfConnections'] === numOfConnectionsInput);
    expect(true).toEqual(numOfConnectionsRowsResults);
  });

  it('should Search by flights with price between 100$ and 500$', () => {
    SearchFormcomponent.searchFlightForm.controls['isPricesFilter'].setValue(true);
    SearchFormfixture.detectChanges();
    SearchFormcomponent.searchFlightForm.controls['pricesFilter'].setValue([100,500]);
    SearchFormcomponent.checkValid();
    SearchFormfixture.detectChanges();
    const pricesRangeInput = SearchFormcomponent.searchFlightForm.controls['pricesFilter'].value;
    SearchFormcomponent.onSubmit();
    ResultsListfixture.detectChanges();
    const resultsArray = ResultsListcomponent.dataSource.data;
    let pricesRangeRowsResults = resultsArray.every( resultsRow => resultsRow['price'] >= pricesRangeInput[0] && resultsRow['price'] <= pricesRangeInput[1]);
    expect(true).toEqual(pricesRangeRowsResults);
  });

  it('should Search a flights from "Israel "to "Thailand" from date "2020/10/09" to date "2020/10/10" with two connections and price between 0 and 700', () => {
    SearchFormcomponent.searchFlightForm.controls['isPricesFilter'].setValue(true);
    SearchFormcomponent.searchFlightForm.controls['isConnections'].setValue(true);
    SearchFormfixture.detectChanges();
    SearchFormcomponent.searchFlightForm.patchValue({
      numOfConnections: 1,
      pricesFilter: [100,700],
      departureDate: '2020/10/09',
      returnDate: '2020/10/10',
      fromLocation: 'Israel',
      toLocation: 'Thailand'
    });
    const conditions = SearchFormcomponent.searchFlightForm.controls;
    SearchFormcomponent.checkValid();
    SearchFormfixture.detectChanges();
    const pricesRangeInput = SearchFormcomponent.searchFlightForm.controls['numOfConnections'].value;
    SearchFormcomponent.onSubmit();
    ResultsListfixture.detectChanges();
    const resultsArray = ResultsListcomponent.dataSource.data;
    let RowsResultsByConditions = resultsArray.every( resultsRow => (resultsRow['price'] >= conditions['pricesFilter'][0] && resultsRow['price'] <= conditions['pricesFilter'][1]) && 
    (conditions['numOfConnections'] === resultsRow['numOfConnections']) && (conditions['departureDate'] === resultsRow['departureDate']) && (conditions['returnDate'] === resultsRow['returnDate']) && (conditions['fromLocation'] === resultsRow['fromLocation']) && (conditions['toLocation'] === resultsRow['toLocation'])
    );
    expect(true).toEqual(RowsResultsByConditions);
  });

  it('should Search a 0 lights', () => {
    SearchFormcomponent.searchFlightForm.controls['isPricesFilter'].setValue(true);
    SearchFormcomponent.searchFlightForm.controls['isConnections'].setValue(true);
    SearchFormfixture.detectChanges();
    SearchFormcomponent.searchFlightForm.patchValue({
      toLocation: 'Japan'
    });
    const conditions = SearchFormcomponent.searchFlightForm.controls;
    SearchFormcomponent.checkValid();
    SearchFormfixture.detectChanges();
    const pricesRangeInput = SearchFormcomponent.searchFlightForm.controls['numOfConnections'].value;
    SearchFormcomponent.onSubmit();
    ResultsListfixture.detectChanges();
    const resultsArray = ResultsListcomponent.dataSource.data;
    expect([]).toEqual(resultsArray);
  });

});
