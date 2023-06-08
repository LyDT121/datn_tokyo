import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ApiService } from './../../../core/services/api.service';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-misspass',
  templateUrl: './misspass.component.html',
  styleUrls: ['./misspass.component.css']
})
export class MisspassComponent extends BaseComponent implements OnInit {
  email: any = "";
  public error = '';
  constructor(injector: Injector, private _router: Router, private apiService: ApiService, private sweetAlertService: SweetAlertService) {
    super(injector);}
    ngOnInit(): void {
    }
    submit() {
      this._api.post('/api/Home/confirm-email', {email: this.email}).subscribe(res => {
        if (res) {
          this.apiService.sendForgotPasswordEmail(this.email);
        } else {
          this.sweetAlertService.showErrorAlert(
            'Thất bại',
            'Email không tồn tại trong hệ thống!'
          );
        }
      });
    }
}
