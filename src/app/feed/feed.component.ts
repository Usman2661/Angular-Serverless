
import { Component,Input,Output, EventEmitter,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({ templateUrl: 'feed.component.html' })
export class FeedComponent  {
    constructor(
        private router:Router
      ){}
    ngOnInit(){
        if (localStorage.getItem('Email') == null){
         this.router.navigate(['/login']);
        }
    }


}
