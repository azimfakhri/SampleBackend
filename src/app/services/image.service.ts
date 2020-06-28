import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) { }

  // async GetImage(link){
  //   return await this.getImageFromLink(link).then(function(blob) {
  //     var reader = new FileReader();
  //     //reader.readAsDataURL(blob);
  //     reader.onloadend = () => {
  //       console.log(reader.result)
  //       return reader.result ;
  //     }
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  async getImageFromLink(url) {
   return await fetch(url + '?token=' + sessionStorage.getItem('user-token'),{
    method: 'GET'
   });
  }
}
