import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  URL_API : string = environment.API;
  constructor(private http: HttpClient) { }

  async GetCompanyList(){
    const res = await this.http.get(this.URL_API + '/admin/getCompanies', { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async AddNewCompany(data){
    const res = await this.http.post(this.URL_API + '/admin/addCompany',data, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async DeleteCompany(id){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res = await this.http.post(this.URL_API + '/admin/deleteCompany/'+ id, { headers, responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async GetEquipmentList(id){
    const res = await this.http.get(this.URL_API + '/admin/getEquipmentByCompany/' + id, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async AddNewEquipment(data){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res = await this.http.post(this.URL_API + '/admin/addEquipmentToCompany',data, { headers, responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async DeleteEquipment(id){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res = await this.http.post(this.URL_API + '/admin/deleteEquipment/'+ id, { headers, responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async DeleteUser(id){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res = await this.http.post(this.URL_API + '/admin/deleteUser/'+ id, { headers, responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async AddNewUser(companyid,data){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res = await this.http.post(this.URL_API + '/admin/addUser/'+ companyid,data, { headers, responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async ResetUserPassword(userid,data){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res = await this.http.post(this.URL_API + '/admin/resetPassword/'+ userid,data, { headers, responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async GetUserList(id){
    const res = await this.http.get(this.URL_API + '/admin/getUsersByCompany/' + id, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }
}
