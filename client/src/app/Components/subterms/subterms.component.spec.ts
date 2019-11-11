import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtermsComponent } from './subterms.component';

describe('SubtermsComponent', () => {
  let component: SubtermsComponent;
  let fixture: ComponentFixture<SubtermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
