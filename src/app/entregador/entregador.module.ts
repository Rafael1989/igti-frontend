import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxCurrencyModule } from 'ngx-currency';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { EntregadorRoutingModule } from './entregador-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EntregadorPesquisaComponent } from './entregador-pesquisa/entregador-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    NgxCurrencyModule,
    FileUploadModule,
    ProgressSpinnerModule,

    SharedModule,
    EntregadorRoutingModule
  ],
  declarations: [
    EntregadorPesquisaComponent
  ],
  exports: []
})
export class EntregadorModule { }
