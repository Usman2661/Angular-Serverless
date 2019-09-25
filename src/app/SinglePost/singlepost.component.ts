import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { UserregisterService } from '../register/userregister.service';
import { NavbarService } from '../navbar/navbar.service';
import { Router,RouterStateSnapshot , ActivatedRoute, Params, RoutesRecognized  } from '@angular/router';
@Component({ templateUrl: 'singlepost.component.html' })
export class SinglePostComponent {
  
  private sub:any;
  PostID: string;

    constructor(private userregisterservice: UserregisterService,
        private router:Router,
        private myroute:ActivatedRoute
        ) {
            console.log('Called Constructor');
            this.myroute.queryParams.subscribe(params => {
                this.PostID = params['Post'];
                console.log(this.PostID);
            });
      
        } 
   ngOnInit(){

    this.sub = this.router.events.subscribe(val => {
        if (val instanceof RoutesRecognized) {
          console.log(val.state.root.firstChild.params);
        }
      });
      
      
       if (localStorage.getItem('Email') == null){
        this.router.navigate(['/login']);
      }

       
    
       
   }
  
}
