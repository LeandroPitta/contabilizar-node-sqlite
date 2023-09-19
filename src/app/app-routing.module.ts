import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnaliticoComponent } from './components/analitico/analitico.component';
import { EditarComponent } from './components/editar/editar.component';

const routes: Routes = [
  { path: '', component: AnaliticoComponent },
  { path: 'editar', component: EditarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
