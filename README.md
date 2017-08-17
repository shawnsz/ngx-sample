

Make sure Nodejs and npm are installed.
npm install -g @angular/cli
ng new TicTacTeo --prefix tic --routing true -sc true
ng g component home
ng g component about-us

Modify app-routing.module.ts to add home and about-us components:
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';

{
  path: '',
  component: HomeComponent
},
{
  path: 'about-us',
  component: AboutUsComponent
}

// material
npm install --save @angular/material @angular/cdk
