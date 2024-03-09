import { Component } from '@angular/core';

export interface PeriodicElement {
  description: string;
  position: number;
  entry: number;
  exit: number;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 2,
    description: 'uma descrição aleatória',
    entry: 4.0026,
    exit: 12525,
    action: '',
  },
  {
    position: 3,
    description: 'outra descrição aleatória',
    entry: 6.941,
    exit: 12525,
    action: '',
  },
  {
    position: 4,
    description: 'Beryllium',
    entry: 9.0122,
    exit: 12525,
    action: '',
  },
];

@Component({
  selector: 'app-table-flow',
  templateUrl: './table-flow.component.html',
  styleUrls: ['./table-flow.component.scss'],
})
export class TableFlowComponent {
  displayedColumns: string[] = ['description', 'entry', 'exit', 'action'];
  dataSource = ELEMENT_DATA;
}
