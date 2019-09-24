import { Component,OnInit  } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  public loggedIn = false;
  ngOnInit(){

    if (localStorage.getItem('Email')!=null){
    
      this.loggedIn=true;
    }
    else if (localStorage.getItem('Email') == null){
     
    this.loggedIn=false;
    }
  }
  constructor(
 
    private router:Router,
  ) {}

  logout(){
    localStorage.removeItem('Email');
    this.router.navigate(['/login']);

  }

}
