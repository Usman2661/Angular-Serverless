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
        ) {} //constructor

    /*
    constructor (private httpService: HttpClient) { }
    comparedata: string [];
  
    ngOnInit () {
      this.httpService.get('https://sbuf52bt6i.execute-api.us-east-2.amazonaws.com/Test/drax-test?type=all').subscribe(
        data => {
          this.comparedata = data as string [];	 // FILL THE ARRAY WITH DATA.
            console.log(this.comparedata[1]);
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
    }
    */
   ngOnInit(){



    if (localStorage.getItem('Email')!=null){
        this.router.navigate(['/dashboard']);
      }
      else if (localStorage.getItem('Email') == null){
        this.router.navigate(['/login']);
      }
  //  getusers(){
        this.users$ = this.userregisterservice.getusers();
    //}
       
   }
  
}
