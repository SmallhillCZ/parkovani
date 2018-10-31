import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'my-lots', pathMatch:'full' },
  { path: 'my-lots', loadChildren: './pages/my-lots/my-lots.module#MyLotsPageModule' },
  { path: 'lots-map', loadChildren: './pages/lots-map/lots-map.module#LotsMapPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
