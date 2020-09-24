import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { ResultsListComponent } from '../results-list/results-list.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  let RLcomponent: ResultsListComponent;
  let RLfixture: ComponentFixture<ResultsListComponent>;
  let submitEl;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitEl = fixture.debugElement;

    RLfixture = TestBed.createComponent(ResultsListComponent);
    RLcomponent = RLfixture.componentInstance;
    RLfixture.detectChanges();
  });

});
