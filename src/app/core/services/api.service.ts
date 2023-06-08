import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {map, take } from 'rxjs/operators';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';
@Injectable({
    providedIn: 'root',
})
export class ApiService {
    public host = environment.BASE_API;
    constructor(private _http: HttpClient, public router: Router, private sweetAlertService: SweetAlertService) { }

    public post(url: string, obj: any) {
        const body = JSON.stringify(obj);
        let cloneHeader: any = {};
        cloneHeader['Content-Type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http
            .post<any>(this.host + url, body, { headers: headerOptions })
            .pipe(
                map((res: any) => {
                    return res;
                })
            );
    }

    public get(url: string) {
        let cloneHeader: any = {};
        cloneHeader['Content-Type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);

        return this._http
            .get(this.host + url, { headers: headerOptions })
            .pipe(
                map((res: any) => {
                    return res;
                })
            );

    }
    public put(url: string, obj: any) {
        const body = JSON.stringify(obj);
        let cloneHeader: any = {};
        cloneHeader['Content-Type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http
            .put<any>(this.host + url, body, { headers: headerOptions })
            .pipe(
                map((res: any) => {
                    return res;
                })
            );
    }
    public uploadFileSingle(url: string, folder: string, file: Blob) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        return this._http.post(this.host + url, formData, {reportProgress: true, observe: 'events' })
    }

    public uploadFileMulti(url: string, folder: string, ...file: Blob[]) {
        const formData = new FormData();
        file.forEach(x => {
            formData.append('files', x);
        });
        formData.append('folder', folder);
        return this._http.post(this.host + url, formData, { reportProgress: true, observe: 'events' })
    }

    public sendMail(url: string, obj: any) {
        let cloneHeader: any = {};
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http
          .post<any>(this.host + url, obj, {reportProgress: true, observe: 'events'})
          .pipe(
            map(res => {
              
              return res;
            })
          );      
      }
      searchByName(name:any):Observable<any>{
        return this._http.get(`${environment.BASE_API}/api/Course/search/${name}`)
    }
    public sendForgotPasswordEmail(email: string) {
        const url = this.host;
        const payload = { email: email, newPass: "123456"  };
        const mail: FormData = new FormData();
        mail.append('ToEmail', email.replace("\r\n",""));
        mail.append('Subject', "Lấy lại mật khẩu thành công");
        mail.append('Body', "Mật khẩu của bạn là: 123456");
        mail.append('Attachments', "");
        this._http.post(url + '/api/Home/reset-password', payload).subscribe(() => {
            this.sendMail('/api/Email/Send', mail).pipe(take(1)).subscribe(()=> {
                this.sweetAlertService.showSuccessAlert(
                    'Thành công',
                    'Mật khẩu đã gửi thành công về mail của bạn!'
                  );
                location.href = '/homes/login'; 
            })
        })
      }
      public sendRegisterEmail(email: string, password: string) {
        const mail: FormData = new FormData();
        mail.append('ToEmail', email.replace("\r\n",""));
        mail.append('Subject', "Trung tâm tin học Tokyo!");
        mail.append('Body', "Chào mừng bạn đến với Tokyo Center của chúng tôi!\r\n Thông tin đăng nhập của bạn là: \r\n Tài khoản: " + email + "\r\n Mật khẩu: " + password);
        mail.append('Attachments', "");
        this.sendMail('/api/Email/Send', mail).pipe(take(1)).subscribe(()=> {
        })
      }

      
}
