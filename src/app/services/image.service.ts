import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) { }

  async getImage(url, fileName) {
   return await fetch(url,{
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('user-token'),
    }
   }).then(r => r.blob())
   .then((blob) => { 
         console.log(blob); 
       return new File([blob], fileName+'.'+   blob.type.split('/')[1]) ;
   });
}
}
