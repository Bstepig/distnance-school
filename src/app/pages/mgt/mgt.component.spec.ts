import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgtComponent } from './mgt.component';

describe('MgtComponent', () => {
  let component: MgtComponent;
  let fixture: ComponentFixture<MgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
