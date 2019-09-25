import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Users } from './user.model';
import { Posts } from '../home/posts.model';
import { Login } from '../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserregisterService {

  //end-point url 
  base_url: string = 'https://sbuf52bt6i.execute-api.us-east-2.amazonaws.com/Test/drax-test';

  constructor(private http: HttpClient) { } //instantiate our http class
  
  
  //method to get all the Userss as you can see it return an observable
  getusers(): Observable<Users[]>{
    //  console.log('getting all Userss from the server');
      return this.http.get<Users[]>(`https://sbuf52bt6i.execute-api.us-east-2.amazonaws.com/Test/drax-test?type=all`);
  }

  getPosts(): Observable<Posts[]>{
    //  console.log('getting all Userss from the server');
      return this.http.get<Posts[]>(`https://sbuf52bt6i.execute-api.us-east-2.amazonaws.com/Test/drax-test?type=posts`);
  }

   //method to get all the Userss as you can see it return an observable
   loginAuth(email,password): Observable<Login[]>{
    //  console.log('getting all Userss from the server');
     
      return this.http.get<Login[]>(`https://sbuf52bt6i.execute-api.us-east-2.amazonaws.com/Test/-login?Email=`+email+`&Password=`+password);
     // https://sbuf52bt6i.execute-api.us-east-2.amazonaws.com/Test/-login?
    }


  addUsers(newUsers:Users): Observable<Users>{
      return this.http.post<Users>(`${this.base_url}`, newUsers, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
  }

  newPost(newPosts:Posts): Observable<Posts>{
    return this.http.post<Posts>(`https://sbuf52bt6i.execute-api.us-east-2.amazonaws.com/Test/posts`, newPosts, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

  /*
  //method to update a Users. return an observable too
  updateUsers(editedUsers:Users): Observable<Users>{
      return this.http.put<Users>(`${this.base_url}/Userss/${editedUsers._id}`, 
      editedUsers, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
  }

  //method to delete one Users. return an observable too
  deleteUsers(_id:string): Observable<Users>{
      return this.http.delete<Users>(`${this.base_url}/Userss/${_id}`);
  }
  */
}
