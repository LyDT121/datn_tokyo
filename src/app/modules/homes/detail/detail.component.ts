import { CartService } from 'src/app/core/services/cart.service';
import { SendService } from 'src/app/core/services/send.service';
import { ApiService } from './../../../core/services/api.service';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends BaseComponent implements OnInit, AfterViewInit {
  public list_loaisp: any;
  public item: any;
  public lesson: any;
  public originListItems: any;
  public quantity: number = 1;
  subtotal:any;
  page: number=1;
  count:number=0;
  tableSize:number=4;
  tableSizes:any=[20,30,40,50]

  constructor(injector: Injector, private _cart: CartService, private _send: SendService, private sweetAlertService: SweetAlertService) {
    super(injector);
  }

  public addToCart(item: any) {
    this._cart.addToCart(item);
    // window.location.reload();
    this.sweetAlertService.showSuccessAlert(
      'Thành công',
      'Đã thêm vào giỏ hàng thành công!'
    );
    
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/Course/get-by-id/' + id).subscribe(res => {
        this.item = res.product;
        this._api.get('/api/CourseCategory/get-kh-theo-dm/' + id).subscribe(res => {
          this.list_loaisp = res;        
        });
        this._api.get('/api/Course/get-by-baihoc/' + id).subscribe(res =>{
          this.lesson = res;
        })
        window.scrollTo({
          top: 0,
          behavior: `smooth`
        })
        setTimeout(() => {
          this.loadScripts('assets/js/hide_menu.js', 'assets/js/slide_show.js');
        });
      });
    });
    
  }
  async handleChangeCategory(maloai: any) {
    if(maloai) {
      this.list_loaisp = this.originListItems.filter((item: any) => item.courseCategoryId === maloai);
    }
    else
      this.list_loaisp = this.originListItems;
    this.count = this.list_loaisp.length;
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
  ngAfterViewInit() {
    this.loadScripts('assets/js/image_product.js', 'assets/js/hide_menu.js', 'assets/js/cart.js');
  }

}
