
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





Data binding: interpolation, Property binding binding, two-way binding, and event binding.
Interpolation: <p>Welcome back {{currentUser.name}}!</p>
Property binding: <img [src]="userImgUrl">
Event bindings: <button (click)="onSave()">Save</button>
Two-way binding: <input [(ngModel)]="hero.name" placeholder="name">

Observables: Observables are the main data structure we use to implement Reactive Programming.
RxJS is functional
Falcor often used with an Observables-type data architecture.

Redux uses functional composition where Flux uses callback registration.
