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
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { SharedModule } from './../shared/shared.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';

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
    ProgressSpinnerModule,

    SharedModule,
    UsuarioRoutingModule
  ],
  declarations: [
    UsuarioCadastroComponent
  ],
  exports: []
})
export class UsuarioModule { }
