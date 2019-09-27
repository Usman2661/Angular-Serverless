import { Component,Input,Output, EventEmitter,OnInit} from '@angular/core';

import { UserregisterService } from '../register/userregister.service';
import { Posts } from './posts.model';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
//import * as AWS from 'aws-sdk';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  angForm: FormGroup;
  image; 
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
/*
          //Image upload

          fileEvent(fileInput: any) {
            
            const AWSService = AWS;
            const region = 'us-east-2	';
            const bucketName = 'com.udemycourse.compare-yourself';
            const IdentityPoolId = '';
            const file = fileInput.target.files[0];
          //Configures the AWS service and initial authorization
            AWSService.config.update({
              region: region,
              credentials: new AWSService.CognitoIdentityCredentials({
                IdentityPoolId: IdentityPoolId
              })
            });
          //adds the S3 service, make sure the api version and bucket are correct
            const s3 = new AWSService.S3({
              apiVersion: '2006-03-01',
              params: { Bucket: bucketName}
            });
          //I store this in a variable for retrieval later
        
            this.image = file.name;
            s3.upload({ Key: file.name, Bucket: bucketName, Body: file, ACL: 'public-read'}, function (err, data) {
             if (err) {
               console.log(err, 'there was an error uploading your file');
             }
           });
          }
          */
}
