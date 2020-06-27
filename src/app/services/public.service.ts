import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  URL_API : string = environment.API;
  constructor(private http: HttpClient) { }

  async getdetails(nric){
    const res = await this.http.get(this.URL_API + '/public/getEmployee/' + nric, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async uploadimg(id,data){
    const res = await this.http.post(this.URL_API + '/uploadImg/'+id,data, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }
}
