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

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminPratoPesquisaComponent } from './admin-prato-pesquisa/admin-prato-pesquisa.component';
import { AdminPratoCadastroComponent } from './admin-prato-cadastro/admin-prato-cadastro.component';
import { AdminUsuarioPesquisaComponent } from './admin-usuario-pesquisa/admin-usuario-pesquisa.component';
import { AdminUsuarioCadastroComponent } from './admin-usuario-cadastro/admin-usuario-cadastro.component';

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
    AdminRoutingModule
  ],
  declarations: [
    AdminPratoCadastroComponent,
    AdminPratoPesquisaComponent,
    AdminUsuarioCadastroComponent,
    AdminUsuarioPesquisaComponent
  ],
  exports: []
})
export class AdminModule { }
