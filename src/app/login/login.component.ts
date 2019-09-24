import { Component,Input,Output, EventEmitter,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserregisterService } from '../register/userregister.service';
import { Login } from './login.model';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar/navbar.service';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    logins: Login[];
  displayOrNot: boolean = true;

  constructor(
    private myData: UserregisterService,
    private router:Router,
    public nav:NavbarService
  ) {}
  

  ngOnInit(): void {
    
    this.nav.show();

    if (localStorage.getItem('Email')!=null){
      this.router.navigate(['/dashboard']);
    }
    else if (localStorage.getItem('Email') == null){
      this.router.navigate(['/login']);
    }          
  }

   onClickSubmit(formData:any) {
   let loginDetails: any = {Email: formData.email, Password: formData.password };
   var Email = formData.email;
   var Passsword= formData.password;

   this.myData.loginAuth(Email,Passsword)
   .subscribe(
     (data: Login[]) =>  { //start of (1)
       this.logins = data;
       console.log(data);
       if (data.toString()!='success'){
        swal.fire(
            'Error !',
            'Email or password is wrong',
            'error'
          )
    }
    if (data.toString()=='success'){
       
          this.router.navigate(['/dashboard']);
          localStorage.setItem('Email', Email);
        
    
    }
     }, //end of (1)
     (error: any)   => console.log(error)
   );
     }    
}
