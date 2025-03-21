import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CardSearchComponent} from './card-search/card-search.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './resgister/register.component';
import {MyDecksComponent} from './my-decks/my-decks.component';

const routes: Routes = [
  {
    path: 'SearchCards',
    component: CardSearchComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Register',
    component: RegisterComponent
  },
  {
    path: 'MyDecks',
    component: MyDecksComponent
  },
  {
    path: '',
    redirectTo: 'SearchCards',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
