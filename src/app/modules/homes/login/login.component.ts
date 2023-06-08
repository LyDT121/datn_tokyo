import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, window } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public frmLogin!: FormGroup;
  public error = '';
  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router:Router, private sweetAlertService: SweetAlertService) { 
    
  }

  ngOnInit(): void {
    this.frmLogin = new FormGroup({
      'txt_taikhoan': new FormControl('', [Validators.required]),
      'txt_matkhau': new FormControl('', [Validators.required]),
    });
    }
    get taikhoan() {
      return this.frmLogin.get('txt_taikhoan')!;
    }
    get matkhau() {
      return this.frmLogin.get('txt_matkhau')!;
    }
  public Login() {
    this.http.get<any>("http://localhost:13277/api/Student/login").subscribe(res=>{

        var user = null;
        res.map((_user: any) => {
          if(_user.email == this.frmLogin.value.txt_taikhoan && _user.password == this.frmLogin.value.txt_matkhau) {
            user = _user;
          }
        })
        
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.sweetAlertService.showSuccessAlert(
            'Thành công',
            'Đăng nhập thành công!'
          );
          location.href = '/';
        }else{
          this.sweetAlertService.showErrorAlert(
            'Thất bại',
            'Tài khoản hoặc mật khẩu không đúng. Kiểm tra lại!'
          );
          
        }
      },err =>{
        this.sweetAlertService.showErrorAlert(
          'Thất bại',
          'Tài khoản không tồn tại!'
        );
      
      
      })

 }
}
