import { AfterViewInit, Component, Injector, OnInit, } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl,Validator,FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import{ gender, statushv } from '../../../../assets/js/course';
import { window } from 'rxjs';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent extends BaseComponent implements OnInit{
 public list_hocviens: any;
    public list_khoahocs: any;
    public lstkhoahoc: any;
    public lstStudentbyID: any;
    public lstKHbyStudent: any;
    public list_hocvien: any;
    p: number = 1;
    total: number = 0;
    tableSize: number = 10;
    tableSizes: any = [20, 30, 40, 50];
  
    public student:any;
    public isCreate = false;
    public user: any;
    public showUpdateModal: any = false;
    public doneSetupForm: any;
    public frmStudent!: FormGroup;
    public frmSearch!: FormGroup;
    public file: any;
    constructor(injector: Injector, private admin_service: AdminService, private sweetAlertService: SweetAlertService) {
      super(injector);
      this.frmSearch = new FormGroup({
        'txt_tenhocvien': new FormControl('', []),
  
      });
      }
  
    ngOnInit(): void {
      this.LoadData();
      // this.user = JSON.parse(localStorage.getItem('user')||'');
      const user = JSON.parse(localStorage.getItem('user')||'');
      this._api.get('/api/Student/get-by-id/' + user.id).subscribe(res => {
        this.user = res.product;
      })

    }
    public LoadData() {
      this._api.post('/api/Student/search', { page: 1, pageSize: 1000, key: this.frmSearch.value['txt_tenhocvien'] }).subscribe((res:any) => {
    
        this.list_hocviens = res;
        this.lstkhoahoc = this.list_hocviens;
        this.total = this.list_hocviens.length;
        setTimeout(() => {
          this.loadScripts(
            'assets/js/core/app.js',
            'assets/js/pages/datatables_basic.js',
            'assets/js/pages/datatables_basic.js'
          );
        });
      });
    }
    onTDChange(event: any) {
      this.p = event;
      // this.getSanPham();
    }
    get id() {
      return this.frmStudent.get('txt_id')!;
    }
    get avatar() {
      return this.frmStudent.get('txt_avatar')!
    }
    get tenhocvien() {
      return this.frmStudent.get('txt_tenhocvien')!;
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
    get courseid() {
      return this.frmStudent.get('txt_courseid')!
    }
    get coursename() {
      return this.frmStudent.get('txt_coursename')!
    }
    get imagecourse() {
      return this.frmStudent.get('txt_imagecourse')!
    }
    onTableDataChange(event: any) {
      this.p = event;
  
    }
    onTableSizeChange(event: any): void {
      this.tableSize = Number(event.target.value);
      this.p = 1;
  
    }

    public openUpdateModal(id: any) {
      this.showUpdateModal = true;
      this.doneSetupForm = false;
      this.isCreate = false;
      setTimeout(() => {
        $('#createSanPhamModal').modal('toggle');
        this._api.get('/api/Student/get-by-id/' + id).subscribe(res => {
          this.student = res.product;
          this.frmStudent = new FormGroup({
            'txt_tenhocvien': new FormControl(this.student.name, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
            'txt_avatar': new FormControl(this.student.avatar, []),
            'txt_description': new FormControl(this.student.description, []),
            'txt_phone': new FormControl(this.student.phone, [Validators.required]),
            'txt_email': new FormControl(this.student.email, [Validators.required]),
            'txt_address': new FormControl(this.student.address, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
            'txt_gender': new FormControl(this.student.gender, [Validators.required]),
            'txt_createdate': new FormControl(this.student.createDate, []),
            'txt_lasteditdate': new FormControl(this.student.lastEditDate, []),
            'txt_status': new FormControl(this.student.status, []),
            'txt_dob': new FormControl(this.student.dob, [Validators.required]),
            'txt_password': new FormControl(this.student.password, [])
        });
        this.doneSetupForm = true;
        });
      });
    }
    public closeModal() {
      $('#createSanPhamModal').closest('.modal').modal('hide');
    }
  
    
  
    public upload(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        this.file = event.target.files[0];
      }
    }
    onSubmit(vl: any) {
      debugger
      if (this.frmStudent.invalid) {
        return;
      }
      let object: any = {};
      object.student = {
        Id: vl.txt_id,
        Name:vl.txt_tenhocvien,
        Avatar: vl.txt_avatar,
        Description: vl.txt_description,
        Phone: vl.txt_phone,
        Email: vl.txt_email,
        Address:vl.txt_address,
        Gender: vl.txt_gender,
        // CreateDate: vl.txt_createdate,
        // LastEditDate: vl.txt_lasteditdate,
        DOB: vl.txt_dob,
        Status:vl.txt_status,
        Password: vl.txt_password
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
                    'Cập nhật thông tin thành công!'
                  );
                  this.LoadData();
                  this.closeModal();
                } else {
                  alert('Có lỗi')
                }
              });
            }
          });
      }
      else {
        this._api.post('/api/Student/create-student', object).subscribe((res: any) => {
          if (res && res.data) {
            this.sweetAlertService.showSuccessAlert(
              'Thành công',
              'Cập nhật thông tin thành công!'
            );
            this.LoadData();
            this.closeModal();
          } else {
            alert('Có lỗi')
          }
        });
      }
    }
    else {
      object.student.Id = this.student.id;
      if (this.file) {
        this._api.uploadFileSingle('/api/upload/upload-single', 'student', this.file).subscribe((res: any) => {
          if (res && res.body && res.body.filePath) {
            object.student.Avatar = res.body.filePath;
            this._api.post('/api/Student/update-student', object).subscribe(res => {
              if (res && res.data) {
                this.sweetAlertService.showSuccessAlert(
                  'Thành công',
                  'Cập nhật thông tin thành công!'
                );
                this.LoadData();
                this.closeModal();
                location.reload();
              } else {
                alert('Có lỗi')
              }
            });
          }
  
          this._api.get('/api/Student/get-all-hocsinh').subscribe(res => {
            this.list_hocvien = res;
            setTimeout(() => {
              this.loadScripts('assets/js/core/app.js'); });
          });
        });
      }
      else {
        this._api.post('/api/Student/update-student', object).subscribe(res => {
          if (res && res.data) {
            this.sweetAlertService.showSuccessAlert(
              'Thành công',
              'Cập nhật thông tin thành công!'
            );
            this.LoadData();
            this.closeModal();
            location.reload();
          } else {
            alert('Có lỗi')
          }
        });
      }
    }
  }
  getGender(genderdelivery: number = 1) {
    const index = genderdelivery;
    return gender.genderOrder[index as keyof typeof gender.genderOrder];
  }
  async GenderBy(gender:any){
    if(gender && gender?.target?.value){
      this.list_hocviens=this.lstkhoahoc.filter((s:any)=>s.gender==gender.target.value)
    
    }
    else
      this.list_hocviens=this.lstkhoahoc;
  }
  
  getStatusOrder(statusdelivery: number = 1) {
    const index = statusdelivery;
    return statushv.statushvOrder[index as keyof typeof statushv.statushvOrder];
  }
  async GetOrderByStatus(status:any){
    if(status && status?.target?.value){
      this.list_hocviens=this.lstkhoahoc.filter((s:any)=>s.status==status.target.value)
    
    }
    else
      this.list_hocviens=this.lstkhoahoc;
  }
    ngAfterViewInit() {
      this.loadScripts('assets/js/core/app.js', 'assets/js/pages/form_layouts.js');
  
    }
  }
   