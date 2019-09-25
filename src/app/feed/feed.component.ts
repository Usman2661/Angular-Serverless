
import { Component,Input,Output, EventEmitter,OnInit} from '@angular/core';
import { UserregisterService } from '../register/userregister.service';
import { Router } from '@angular/router';
import { Comment } from './comment.model';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({ templateUrl: 'feed.component.html' })
export class FeedComponent  {

    posts$;
    angForm: FormGroup;

    constructor(
        private router:Router,
        private myData: UserregisterService,
        private fb: FormBuilder,
      ){
          this.validateform();
      }

      validateform() {
        this.angForm = this.fb.group({
           Comment: ['', Validators.required ],
           PostID: [  ]
         
        });
      }

    ngOnInit(){

        this.posts$ = this.myData.getPosts();

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
        this.myData.addComment(newComment)
        .subscribe(
            (data: Comment) => {
               console.log(data);
           
                 if (data.toString()=='{}'){
                     swal.fire(
                         'Error !',
                         'There was an error while adding comment',
                         'error'
                       )
                 }
                 if (data.toString()!='{}'){
                     swal.fire(
                         'Success !',
                         'Comment Added Successfully!',
                         'success'
                       )
                 }
               
 
            }, // (1)
            (error: any) => console.log(error), //(2)wese2
        );
    }

    }



