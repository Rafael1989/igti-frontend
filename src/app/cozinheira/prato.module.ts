import { RouterModule } from '@angular/router';
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

import { PratoRoutingModule } from './prato-routing.module';
import { SharedModule } from './../shared/shared.module';
import { PratoPesquisaComponent } from './prato-pesquisa/prato-pesquisa.component';
import { PratoCadastroComponent } from './prato-cadastro/prato-cadastro.component';

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
    PratoRoutingModule
  ],
  declarations: [
    PratoCadastroComponent,
    PratoPesquisaComponent
  ],
  exports: []
})
export class PratoModule { }
