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
  user;
  ngOnInit(){

    var global = global || window;
    var Buffer = Buffer || [];
    var process = process || {
      env: { DEBUG: undefined },
      version: []
    };

    if (localStorage.getItem('Email')!=null){
    
      this.loggedIn=true;
      this.user=localStorage.getItem('Name');
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
    localStorage.removeItem('Name');
    this.loggedIn=false;
    this.router.navigate(['/login']);
    console.log("Logout is called!!");

  }
  feed(){
    
    this.router.navigate(['/feed']);
    if (localStorage.getItem('Email')!=null){
    
      this.loggedIn=true;
    }
    else if (localStorage.getItem('Email') == null){
     
    this.loggedIn=false;
    }
    console.log("Feed is called");
  }
  dashboard(){

    this.router.navigate(['/dashboard']);
    if (localStorage.getItem('Email')!=null){
    
      this.loggedIn=true;
    }
    else if (localStorage.getItem('Email') == null){
     
    this.loggedIn=false;
    }
    console.log("Dashboard is called");

  }
  register (){
  
    this.router.navigate(['/register']);
    if (localStorage.getItem('Email')!=null){
    
      this.loggedIn=true;
    }
    else if (localStorage.getItem('Email') == null){
     
    this.loggedIn=false;
    }
    console.log("Register is called");

  }
  login(){
  
    this.router.navigate(['/login']);
    if (localStorage.getItem('Email')!=null){
    
      this.loggedIn=true;
    }
    else if (localStorage.getItem('Email') == null){
     
    this.loggedIn=false;
    }
    console.log("Login is called");

  }
  home(){

    this.router.navigate(['/home']);
    if (localStorage.getItem('Email')!=null){
    
      this.loggedIn=true;
    }
    else if (localStorage.getItem('Email') == null){
     
    this.loggedIn=false;
    }
    console.log("Home is called");

  }

}
