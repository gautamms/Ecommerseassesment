import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { BaseComponent } from './views/layout/base/base.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/layout/layout.module').then(m => m.LayoutModule) },
  { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },

  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    
  },

];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
