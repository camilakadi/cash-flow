import { Component } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-flow',
  styleUrls: ['./form-flow.component.scss'],
  templateUrl: './form-flow.component.html',
})
export class FormFlowComponent {
  foods: Food[] = [
    { value: 'entry', viewValue: 'Entrada' },
    { value: 'exit', viewValue: 'Saída' },
  ];
}
