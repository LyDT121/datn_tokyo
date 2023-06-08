import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ModulesComponent } from './modules.component';
import { modulesRoutes } from './modules.route';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ModulesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild(modulesRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModulesModule { }
