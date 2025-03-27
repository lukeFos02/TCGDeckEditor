import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgOptimizedImage} from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './resgister/register.component';
import { MyDecksComponent } from './my-decks/my-decks.component';
import {MatOption, MatSelect} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    CardSearchComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    MyDecksComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, MatFormField, MatInput, MatIconButton, MatIcon, NgbModule, MatButton, NgOptimizedImage, FormsModule, MatSelect, MatOption, MatSuffix
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
