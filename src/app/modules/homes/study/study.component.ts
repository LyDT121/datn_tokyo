import { CartService } from 'src/app/core/services/cart.service';
import { SendService } from 'src/app/core/services/send.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl,Validator,FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent extends BaseComponent implements OnInit {
  public list_item:any = [];
  public list_loaisp:any;
  public sp_moi: any;
  public originListItems: any;
  public item:any;
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
  public link: any;
  constructor(injector: Injector,private _send: SendService, private _cart: CartService, private sanitizer: DomSanitizer) {
    super(injector);
  }
  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user')||'');
    $('#createdetailModal').closest('.modal').modal('hide');
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/Course/get-by-baihoc/' + id).subscribe(res => {
        
        this.list_item = res;
        this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.list_item[0].linkJoin);
        this.list_item.forEach((i:any) => {
          i.linkJoin =  this.sanitizer.bypassSecurityTrustResourceUrl(i.linkJoin)

        })
        setTimeout(() => {
          this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
        });
      });
    });
  }

  selectImage(image: any) {
    this.link = image;
  }


}
