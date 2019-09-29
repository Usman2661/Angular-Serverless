import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { UserregisterService } from '../register/userregister.service';
import { NavbarService } from '../navbar/navbar.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Comment } from '../feed/comment.model';

import { Router,RouterStateSnapshot , ActivatedRoute, Params, RoutesRecognized  } from '@angular/router';
import swal from 'sweetalert2';
@Component({ 
  styleUrls: ['singlepost.component.css'],
  templateUrl: 'singlepost.component.html' })
export class SinglePostComponent {
  
  mypost$;
  mycomments$;
  private sub:any;
  PostID: string;
  angForm:FormGroup;

    constructor(private userregisterservice: UserregisterService,
        private router:Router,
        private myroute:ActivatedRoute,
        private fb: FormBuilder,
        ) {
            console.log('Called Constructor');
            this.myroute.queryParams.subscribe(params => {
                this.PostID = params['Post'];
                console.log(this.PostID);
            });

            this.validateform();
      
        } 

        validateform() {
          this.angForm = this.fb.group({
             Comment: ['', Validators.required ],
             PostID: [  ]
           
          });
        }
   ngOnInit(){

    this.mypost$ = this.userregisterservice.getsinglepost(this.PostID);
    this.mycomments$ = this.userregisterservice.getComments(this.PostID);
      
      
       if (localStorage.getItem('Email') == null){
        this.router.navigate(['/login']);
      }
   }

   onPostComment(event:any){
    var Comment = event.target.Comment.value;
    var PostID=event.target.PostID.value;
    //alert(event.target.last_name.value);

    var email=localStorage.getItem('Email');
    var name=localStorage.getItem('Name');

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    let newComment: any =  { PostID: PostID, Comment: Comment ,Username: name , UserEmail:email, DateTime: dateTime};
    console.log(newComment);
    this.userregisterservice.addComment(newComment)
    .subscribe(
        (data: Comment) => {
           console.log(data);
       
             if (data.toString()=='{}'){
                 swal.fire(
                     'Error !',
                     'There was an error while adding comment',
                     'error'
                   )
                   location.reload();
             }
             if (data.toString()!='{}'){
                 swal.fire(
                     'Success !',
                     'Comment Added Successfully!',
                     'success'
                   )
                   window.location.reload();
             }
           

        }, // (1)
        (error: any) => console.log(error), //(2)wese2
    );
}
   
  
}
