import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitComponent } from './produit/produit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitResolver } from './produit/produit.resolver';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'home',
    component:HomeComponent,
    children : [
      {
        path: 'produit',
        component:ProduitComponent,
        resolve:{
          produits:ProduitResolver
        },
        outlet : 'contentOutlet'
      },
      {
        path: 'dashboard',
        component:DashboardComponent,
        outlet : 'contentOutlet'
      },
      {
        path: 'user',
        component:UserComponent,
        outlet : 'contentOutlet'
      },
    ]
  },
  {
    path: 'login',
    component:LoginComponent
  },

  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule],
  providers: [ProduitResolver]
})
export class AppRoutingModule { }
