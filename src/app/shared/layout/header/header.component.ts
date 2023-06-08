import { CartService } from 'src/app/core/services/cart.service';
import { SendService } from 'src/app/core/services/send.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl,Validator,FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  public list_item:any;
  public list_loaisp:any;
  public sp_moi: any;
  public originListItems: any;
  public loaisp:any;
  public user: any;
  public lstStudentbyID: any;
  public lstKHbyStudent: any;
  p: number = 1;
  total: number = 0;
  tableSize: number = 10;
  tableSizes: any = [20, 30, 40, 50];

  public student:any;
  public isCreate = false;
  
  public showUpdateModal: any = false;
  public doneSetupForm: any;
  public frmStudent!: FormGroup;
 
  public sosanphams:any=0;
  // _api: any;
  constructor(injector: Injector,private _send: SendService, private _cart: CartService, private sweetAlertService: SweetAlertService) {
    super(injector);
  }

  ngOnInit(): void {
    this.sosanphams=this._cart.getItems().length;
    this.user = JSON.parse(localStorage.getItem('user')||'');
    // this._send.objs.subscribe((res: any) => {
    //   if(res) {
    //     this.sosanphams=res; 
    //   }
    // });
    
    this._api.get('/api/CourseCategory/get-all-loai').subscribe((res: any) => {
      this.loaisp = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
      });
    });

    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/CourseCategory/get-kh-theo-dm/'+id).subscribe(res => {
      this.list_loaisp = res;

      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' ); 
      });
    });
    });

  }
  Logout() {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn đăng xuất?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'OK',
    }).then((result) => {
      localStorage.removeItem('user');
    // location.reload();
    location.href = '/';
    // this.user.logout();
      
    });
     
  }
  public View(id: any) {
    this.doneSetupForm = false;
    this._api.get('/api/Student/get-kh-theo-hv/' + id).subscribe(res1 => {
      this.lstStudentbyID = res1;
    
    setTimeout(() => {
      ($('#createdetailModal')).modal('toggle');
      
       
          
        })
   
      this.doneSetupForm = true;
    })
  }
}
