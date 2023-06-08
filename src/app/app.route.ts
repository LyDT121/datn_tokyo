import { Routes } from '@angular/router';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { PrintComponent } from '../../src/print/print.component';
export const AppRoute: Routes = [
  { path: '', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)},
  { path: 'print', component: PrintComponent },
  { path: '**', redirectTo:'not-found', pathMatch:'full'},
];
