import { Component,Input,Output, EventEmitter,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserregisterService } from '../register/userregister.service';
import { Login } from './login.model';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NavbarService } from '../navbar/navbar.service';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    logins: Login[];
  displayOrNot: boolean = true;
  angForm: FormGroup;
  submitted = false;


  constructor(
    private myData: UserregisterService,
    private router:Router,
    private fb: FormBuilder,
    public nav:NavbarService,
  ) {
    //this.createForm();
  }
  

  

  ngOnInit(): void {

    this.angForm = this.fb.group({
      email: ['', [Validators.required , Validators.email] ],
      password: ['', Validators.required ]
   });

    if (localStorage.getItem('Email')!=null){
      this.router.navigate(['/dashboard']);
    }
    else if (localStorage.getItem('Email') == null){
      this.router.navigate(['/login']);
    }          
  }
  get f() { return this.angForm.controls; }

   onClickSubmit(formData:any) {

    this.submitted = true;
    if (this.angForm.invalid) {
      return;
  }

   let loginDetails: any = {Email: formData.email, Password: formData.password };
   var Email = formData.email;
   var Passsword= formData.password;

   this.myData.loginAuth(Email,Passsword)
   .subscribe(
     (data: Login[]) =>  { //start of (1)
       this.logins = data;
        
        var userdetails=JSON.stringify(data);
        var user= userdetails.replace("[","");
        var user2= user.replace("]","");
        console.log(userdetails);
     

        var obj=JSON.parse(user2);
        var name = obj.name;

       if (data.toString()=='error'){
        swal.fire(
            'Error !',
            'Email or password is wrong',
            'error'
          )
    }
    if (data.toString()!='error'){
       
          this.router.navigate(['/dashboard']);
          localStorage.setItem('Email', Email);
          localStorage.setItem('Name', name);
          window.location.reload();
    }
     }, //end of (1)
     (error: any)   => console.log(error)
   );
     }    
}
