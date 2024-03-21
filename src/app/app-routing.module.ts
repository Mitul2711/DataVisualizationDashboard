import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProgressionComponent } from './components/progression/progression.component';
import { FormComponent } from './components/form/form.component';
import { AbcComponent } from './components/abc/abc.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'social', component: DashboardComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'progression', component: ProgressionComponent },
  { path: 'abc', component: AbcComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
