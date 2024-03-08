import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFlowComponent } from './table-flow.component';

describe('TableFlowComponent', () => {
  let component: TableFlowComponent;
  let fixture: ComponentFixture<TableFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
