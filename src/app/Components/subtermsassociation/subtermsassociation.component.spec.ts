import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtermsassociationComponent } from './subtermsassociation.component';

describe('SubtermsassociationComponent', () => {
  let component: SubtermsassociationComponent;
  let fixture: ComponentFixture<SubtermsassociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtermsassociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtermsassociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
