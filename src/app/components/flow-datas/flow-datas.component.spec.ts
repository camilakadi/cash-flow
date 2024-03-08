import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowDatasComponent } from './flow-datas.component';

describe('FlowDatasComponent', () => {
  let component: FlowDatasComponent;
  let fixture: ComponentFixture<FlowDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowDatasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
