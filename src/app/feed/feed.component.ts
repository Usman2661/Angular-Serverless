
import { Component,Input,Output, EventEmitter,OnInit} from '@angular/core';
import { UserregisterService } from '../register/userregister.service';
import { Router } from '@angular/router';

@Component({ templateUrl: 'feed.component.html' })
export class FeedComponent  {

    posts$;

    constructor(
        private router:Router,
        private userregisterservice: UserregisterService,
      ){}
    ngOnInit(){

        this.posts$ = this.userregisterservice.getPosts();

        if (localStorage.getItem('Email') == null){
         this.router.navigate(['/login']);
        }

    }


}
