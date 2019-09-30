import { Component,Input,Output, EventEmitter,OnInit} from '@angular/core';

import { UserregisterService } from '../register/userregister.service';
import { Posts } from './posts.model';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as AWS from 'aws-sdk';
import { MzSelectModule } from 'ngx-materialize'

//import * as M from "materialize-css/dist/js/materialize";


import { environment } from '../../environments/environment';



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
           PostMessage: ['', Validators.required ],
           myimage:['',Validators.required],
           Catagory:['',Validators.required]
        });
      }
    ngOnInit(){
           if (localStorage.getItem('Email') == null){
            this.router.navigate(['/login']);
           }

         //  $("select").material_select();
       }
       selectedFile: File

       onFileChanged(event) {
         this.selectedFile = event.target.files[0];
        
       }


       onClickSubmit(formData:any) {

        this.onUpload(); 
        
        var myImage = "https://usmanblogserverless.s3.amazonaws.com/PostImages/"+this.selectedFile.name;
        var email=localStorage.getItem('Email');
        var name=localStorage.getItem('Name');

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let newPost: any = { PostTitle: formData.PostTitle, PostMessage: formData.PostMessage, Username:name , UserEmail:email, DateTime: dateTime, Image: myImage, Catagory:formData.Catagory};
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

          //Image upload

          /*
          onFileChanged(event) {
            const file = event.target.files[0];
            console.log(file);
          }

          */
      
         onUpload() {

            const AWSService = AWS;
            const region = environment.region;
            const bucketName = environment.bucketname;
            const IdentityPoolId = environment.cognitouserpoolid;
            const file = this.selectedFile;
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
            s3.upload({ Key: "PostImages/"+file.name, Bucket: bucketName, Body: file, ACL: 'public-read'}, function (err, data) {

              console.log(data);
              console.log(data.Location);
              
             if (err) {
             //  console.log("Error Type Reached!!!");
               console.log(err, 'there was an error uploading your file');
             }
            
           });


          }
          
          
}
