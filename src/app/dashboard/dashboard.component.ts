import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { UserregisterService } from '../register/userregister.service';
import { NavbarService } from '../navbar/navbar.service';
import { Router } from '@angular/router';
@Component({ templateUrl: 'dashboard.component.html' })
export class DashboardComponent {
    users$;
    title = 'JSON to Table Example';
    constructor(private userregisterservice: UserregisterService,
        private router:Router,
        ) {} 
   ngOnInit(){
    if (localStorage.getItem('Email')!=null){
        this.router.navigate(['/dashboard']);
      }
      else if (localStorage.getItem('Email') == null){
        this.router.navigate(['/login']);
      }

        this.users$ = this.userregisterservice.getusers();
    
       
   }
  
}
