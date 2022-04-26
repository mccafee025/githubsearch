import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment.prod';
import { Users } from '../app/module/users';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Injectable({
  providedIn: 'root'
})
export class GitServiceService {

  user: Users[] = [];
  _URL = 'https://api.github.com/users/';
  token = '?8b9e17143d094a525a75e0d0637d4f7691770cb4';

  constructor(private http: HttpClient) { }

  searchUser(searchTerm: string) {
    interface ApiResponse {
      avatar_url: string;
      name: string;
      bio: string;
      followers: string;
      following: string;
      public_repos: string;
    }

    let promise = new Promise<void>((resolve, reject) => {
      this.user = [];
      this.http.get<ApiResponse>(this._URL + searchTerm + this.token).toPromise().then((results) => {
        this.user.push(results);
        console.log(results);

        resolve();
      }, (err) => {
        reject();
      }
      )
    })
    return promise;
  }
}
