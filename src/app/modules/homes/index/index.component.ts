import { ApiService } from './../../../core/services/api.service';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl,Validator,FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent extends BaseComponent implements OnInit,AfterViewInit {
  public list_item:any;
  public list_giaovien:any;
  public list_danhgia:any;
  public sp_moi: any;
  public originListItems: any;
  public courseCategory:any;
  public showUpdateModal: any = false;
  public frmStudent!: FormGroup;
  public doneSetupForm: any;
  public isCreate = false;
  products:any[]=[];
  subtotal:any;
  page: number=1;
  count:number=0;
  tableSize:number=8;
  tableSizes:any=[20,30,40,50]

  page1: number=1;
  count1:number=0;
  tableSize1:number=4;
  tableSizes1:any=[20,30,40,50]
  public originListItems1: any;

  constructor( injector: Injector , private sweetAlertService: SweetAlertService) {
    super(injector);
    
   }
   
  onSlideChange() {
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

  get courseid() {
    return this.frmStudent.get('txt_courseid')!
  }
  get coursename() {
    return this.frmStudent.get('txt_coursename')!
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getNewProducts();
    this._api.get('/api/CourseCategory/get-all-loai').subscribe((res: any) => {
      this.courseCategory = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
      });
    });
    this._api.get('/api/Teacher/get-all-giaovien').subscribe((res: any) => {
      this.list_giaovien = res;
      this.count1 = res.length;
      this.originListItems1 = res;
      
    this.tableSize1 = this.tableSize1;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
      });
    });
    this._api.get('/api/Evaluate/get-all-danhgia').subscribe((res: any) => {
      this.list_danhgia = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
      });
    });
    this.createModal();
  }

  getAllProducts() {
    this._api.get('/api/Course/get-all-khoahoc').subscribe(res => {
      this.list_item = res;
      this.count = res.length;
      this.originListItems = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' ); 
      });
    });
  }

  async handleChangeCategory(maloai: any) {
    if(maloai) {
      this.list_item = this.originListItems.filter((item: any) => item.courseCategoryId === maloai);
    }
    else
      this.list_item = this.originListItems;
    this.count = this.list_item.length;
    this.page = 1;
    this.tableSize = this.tableSize;
  }
  onTableDataChange(event:any){
    this.page = event;
    // this.getAllProducts();
  }
  onTableSizeChange(event:any):void{
    this.tableSize = Number(event.target.value);
    this.page = 1;
  }
  onTableDataChange1(event:any){
    this.page1 = event;
    // this.getAllProducts();
  }
  onTableSizeChange1(event:any):void{
    this.tableSize1 = Number(event.target.value);
    this.page1 = 1;
  }
  getNewProducts() {
    this._api.get('/api/Course/get-kh-moi-nhat').subscribe(res => {
      this.sp_moi = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' ); 
      });
    });
  }


  public createModal() {
    // this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      // $('#createSanPhamModal').modal('toggle');
      // this.doneSetupForm = true;
      this.frmStudent = new FormGroup({
        'txt_tenhocvien': new FormControl('', []),
        // 'txt_avatar': new FormControl('', []),
        'txt_description': new FormControl('',  []),
        'txt_phone': new FormControl('',  []),
        'txt_email': new FormControl('',  []),
        'txt_address': new FormControl('', [Validators.minLength(3), Validators.maxLength(250)]),
        // 'txt_gender': new FormControl('',  []),
        // 'txt_createdate': new FormControl('', []),
        // 'txt_lasteditdate': new FormControl('', []),
        // 'txt_dob': new FormControl('',  []),
        // 'txt_status': new FormControl('',  []),
        // 'txt_password': new FormControl('',  [])
        
      });
    });
  }
  public closeModal() {
    $('#createSanPhamModal').closest('.modal').modal('hide');
  }
  onSubmit(vl: any) {
    if (this.frmStudent.invalid) {
      return;
    }
    let object: any = {};
    object.student = {
      // Id: vl.txt_id,
      Name:vl.txt_tenhocvien,
      // Avatar: '',
      Description: vl.txt_description,
      Phone: vl.txt_phone,
      Email: vl.txt_email,
      Address:vl.txt_address,
      // Gender: '',
      // DOB: '',
      // Status:vl.txt_status,
      // Password: ''

    };
    if (this.isCreate) {
      this._api.post('/api/Student/register-student', object).subscribe(res =>{
        
        if (res && res.data) {
          this.sweetAlertService.showSuccessAlert(
            'Thành công',
            'Cảm ơn bạn! Chúng tôi sẽ liên hệ tư vấn bạn sớm nhất!'
          );
          window.location.reload();
        } else {
          alert('Có lỗi')
        }
      });
    }
    else {
      
    }
  }

  
  ngAfterViewInit() { 
    //this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' ); 
    
  }
  
}

