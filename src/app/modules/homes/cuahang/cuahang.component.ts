import { CartService } from 'src/app/core/services/cart.service';
import { SendService } from 'src/app/core/services/send.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { FormControl,Validator,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cuahang',
  templateUrl: './cuahang.component.html',
  styleUrls: ['./cuahang.component.css']
})
export class CuahangComponent extends BaseComponent implements OnInit{
  // public list_item:any;
  public list_giaovien:any;
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

  public list_item!:any[];
  constructor( injector: Injector) {
    super(injector);
   }

   ngOnInit(): void {
    this.getAllProducts();
    this._api.get('/api/CourseCategory/get-all-loai').subscribe((res: any) => {
      this.courseCategory = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
      });
    });
    this._api.get('/api/Teacher/get-all-giaovien').subscribe((res: any) => {
      this.list_giaovien = res;
      setTimeout(() => {
        this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
      });
    });
    
  }
  sortProductByPrice(option:any){
    if(option.value =='asc'){
      this.list_item.sort((a, b) => Number(a.price) - Number(b.price));
      
    }else if(option.value =='dsc'){
      this.list_item.sort((a, b) => Number(b.price) - Number(a.price));
    }
 }
 
 
  getAllProducts() {
    this._api.get('/api/Course/get-all-khoahoc').subscribe(res => {
      this.list_item = res;
      console.log(this.list_item)
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
  
  async handleChangeTeacher(id: any) {
    if(id) {
      this.list_item = this.originListItems.filter((item: any) => item.teacherId === id);
    }
    else
      this.list_item = this.originListItems;
      console.log(this.list_item)
    this.count = this.list_item.length;
    this.page = 1;
    this.tableSize = this.tableSize;
  }
  onTableDataChange(event:any){
    this.page = event;
    // this.getAllProducts();
  }
  onTableSizeChange(event:any):void{
    console.log([event.target.value]);
    this.tableSize = Number(event.target.value);
    this.page = 1;
  }

  ngAfterViewInit() { 
    this.loadScripts('assets/js/hide_menu.js'); 
   }
}
