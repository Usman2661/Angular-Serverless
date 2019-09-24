import { Component,Input,Output, EventEmitter,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserregisterService } from './userregister.service';
import { Users } from './user.model';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {

    constructor(private myData: UserregisterService,
      private router:Router,
      ) {} //constructor
    ngOnInit() {
      if (localStorage.getItem('Email')!=null){
        this.router.navigate(['/dashboard']);
      }
    }

   onClickSubmit(formData:any) {
 
   let newUsers: any = { Name: formData.name, Email: formData.email, Password: formData.password };
   this.myData.addUsers(newUsers)
       .subscribe(
           (data: Users) => {
              console.log(data);
              // alert("User Created Successfully!!!");
                if (data.toString()=='The email is already in use'){
                    swal.fire(
                        'Error !',
                        'The Email is already in use please use a different email!',
                        'error'
                      )
                }
                if (data.toString()!='The email is already in use'){
                    swal.fire(
                        'Success !',
                        'User registered successfully!',
                        'success'
                      )
                }
              

           }, // (1)
           (error: any) => console.log(error), //(2)wese2
           () => console.log('completed') //(3)
       );
     }    
}