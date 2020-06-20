import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  URL_API : string = environment.API;
  constructor(private http: HttpClient) { }

  async getDepartmentList(){
    const res = await this.http.get(this.URL_API + '/manage/getDepartments', { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async addDepartment(data){
    const res = await this.http.post(this.URL_API + '/manage/addDepartment',data, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async deleteDepartment(id){
    const res = await this.http.post(this.URL_API + '/manage/deleteDepartment/' + id, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async updateDepartment(id,data){
    const res = await this.http.post(this.URL_API + '/manage/updateDepartment/' + id,data, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async getEmployeesByDepartment(id){
    const res = await this.http.get(this.URL_API + '/manage/getEmployeesByDepartment/' + id, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async getEmployee(id){
    const res = await this.http.get(this.URL_API + '/manage/getEmployee/' + id, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async addEmployee(data){
    const res = await this.http.post(this.URL_API + '/manage/addEmployee',data, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async updateEmployee(id,data){
    const res = await this.http.post(this.URL_API + '/manage/updateEmployee' + id,data, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async deleteEmployee(id){
    const res = await this.http.post(this.URL_API + '/manage/deleteEmployee' + id, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async getEquipments(){
    const res = await this.http.get(this.URL_API + '/manage/getEquipments', { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

  async updateEquipment(id,data){
    const res = await this.http.post(this.URL_API + '/manage/updateEquipment' + id,data, { responseType: 'json'}).toPromise()
     .catch(err => { console.log(err);
    });

    return res;
  }

}
