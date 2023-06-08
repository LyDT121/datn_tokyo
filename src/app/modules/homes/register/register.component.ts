import { ApiService } from './../../../core/services/api.service';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { Router } from '@angular/router';
import { FormControl, Validator, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit, AfterViewInit {
  public list_item: any;
  public showUpdateModal: any = false;
  public frmStudent!: FormGroup;
  public doneSetupForm: any;
  public isCreate = false;
  public student: any;

  public file: any;
  constructor(injector: Injector, private _router: Router, private sweetAlertService: SweetAlertService, private apiService: ApiService) {
    super(injector);
  }
  get id() {
    return this.frmStudent.get('txt_id')!;
  }
  get avatar() {
    return this.frmStudent.get('txt_avatar')!
  }
  get ten() {
    return this.frmStudent.get('txt_name')!
  }
  get phone() {
    return this.frmStudent.get('txt_phone')!
  }
  get email() {
    return this.frmStudent.get('txt_email')!
  }
  get address() {
    return this.frmStudent.get('txt_address')!
  }
  get description() {
    return this.frmStudent.get('txt_description')!
  }
  get gender() {
    return this.frmStudent.get('txt_gender')!
  }
  get dob() {
    return this.frmStudent.get('txt_dob')!
  }
  get createdate() {
    return this.frmStudent.get('txt_createdate')!
  }
  get lasteditdate() {
    return this.frmStudent.get('txt_lasteditdate')!
  }
  get status() {
    return this.frmStudent.get('txt_status')!
  }
  get password() {
    return this.frmStudent.get('txt_password')!
  }


  ngOnInit(): void {
    this.createModal();
  }
  public createModal() {
    this.isCreate = true;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this.doneSetupForm = true;
      this.frmStudent = new FormGroup({
        'txt_name': new FormControl('', []),
        // 'txt_avatar': new FormControl('', []),
        // 'txt_description': new FormControl('', []),
        'txt_phone': new FormControl('', []),
        'txt_email': new FormControl('', []),
        'txt_address': new FormControl('', [Validators.minLength(3), Validators.maxLength(250)]),
        'txt_gender': new FormControl('', []),
        // 'txt_createdate': new FormControl('', []),
        // 'txt_lasteditdate': new FormControl('', []),
        'txt_dob': new FormControl('', []),
        // 'txt_status': new FormControl('', []),
        'txt_password': new FormControl('', []),

      });
    });
  }

  public upload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  onSubmit(vl: any) {

    let object: any = {};
    object.student = {
      // Id: vl.txt_id,
      Name: vl.txt_name,
      // Avatar: vl.txt_avatar,
      // Description: "",
      Phone: vl.txt_phone,
      Email: vl.txt_email,
      Address: vl.txt_address,
      Gender: vl.txt_gender,
      DOB: vl.txt_dob,
      Password: vl.txt_password,
      // Status:vl.txt_status,
    };
    if (this.isCreate) {
      if (this.file) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'student', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            object.student.Avatar = res.body.filePath;
            this._api.post('/api/Student/create-student', object).subscribe(res => {

              if (res && res.data) {
                this.sweetAlertService.showSuccessAlert(
                  'Thành công',
                  'Đăng ký thành công!'
                );
                this.apiService.sendRegisterEmail(vl.txt_email, vl.txt_password);                
                this._router.navigate(['/homes/login']);
              } else {
                alert('Có lỗi')
              }
            });
          }
        });
      } else {
        object.student.Avatar = null;
        this._api.post('/api/Student/create-student', object).subscribe(res => {

          if (res && res.data) {
            this.sweetAlertService.showSuccessAlert(
              'Thành công',
              'Đăng ký thành công!'
            );
            
            this.apiService.sendRegisterEmail(vl.txt_email, vl.txt_password);
            this._router.navigate(['/homes/login']);
          } else {
            alert('Có lỗi')
          }
        });
      }
    }
  }

  ngAfterViewInit() {
    //this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' ); 
  }
}
