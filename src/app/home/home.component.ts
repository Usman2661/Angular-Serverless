import { Component,Input,Output, EventEmitter,OnInit} from '@angular/core';

import { UserregisterService } from '../register/userregister.service';
import { Posts } from './posts.model';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  angForm: FormGroup;
    constructor(
        private router:Router,
        private myData: UserregisterService,
        private fb: FormBuilder,
    
      ) {
        this.createForm();
      }

      createForm() {
        this.angForm = this.fb.group({
           PostTitle: ['', Validators.required ],
           PostMessage: ['', Validators.required ]
        });
      }
    ngOnInit(){
           if (localStorage.getItem('Email') == null){
            this.router.navigate(['/login']);
           }
       }

       onClickSubmit(formData:any) {
        
        var email=localStorage.getItem('Email');
        var name=localStorage.getItem('Name');

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let newPost: any = { PostTitle: formData.PostTitle, PostMessage: formData.PostMessage, Username: name , UserEmail:email, DateTime: dateTime};
        this.myData.newPost(newPost)
            .subscribe(
                (data: Posts) => {
                   console.log(data);
               
                     if (data.toString()=='{}'){
                         swal.fire(
                             'Error !',
                             'There was an error while creating the post',
                             'error'
                           )
                     }
                     if (data.toString()!='{}'){
                         swal.fire(
                             'Success !',
                             'Post Created successfully!',
                             'success'
                           )
                     }
                   
     
                }, // (1)
                (error: any) => console.log(error), //(2)wese2
            );
          }    
}
