import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
 // moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent {

  constructor( public nav: NavbarService ) {}
}