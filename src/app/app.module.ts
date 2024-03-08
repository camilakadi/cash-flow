import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CurrentMonthComponent } from './components/current-month/current-month.component';
import { FlowDatasComponent } from './components/flow-datas/flow-datas.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormFlowComponent } from './components/form-flow/form-flow.component';
import { HeaderComponent } from './components/header/header.component';
import { TableFlowComponent } from './components/table-flow/table-flow.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormFlowComponent,
    TableFlowComponent,
    FlowDatasComponent,
    CurrentMonthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
