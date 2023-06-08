import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit, AfterViewInit {
  public list: any;
  public tTong: any;
  public user:any;  
  constructor(injector: Injector, private _cart: CartService, private _router: Router, private sweetAlertService: SweetAlertService) {
    super(injector);
  }
  public ThanhToan () {
    if(this.user.email)
      window.location.href = '/homes/thanhtoan';
    else {
      this.sweetAlertService.showWarningAlert(
        'Cảnh báo',
        'Bạn cần đăng nhập để thanh toán.'
      );
      this._router.navigate(['/homes/login']);
    }
      
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')||'{}');
    const local_storage : any = localStorage.getItem('cart');
    this.list = JSON.parse(local_storage || []); 
    this.tTong = this.list.reduce((sum:any, x:any) => sum + x.price, 0);
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/hide_menu.js');
  }
  
  public XoaCart() {
    if (confirm("Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng!")) {
        localStorage.setItem('cart','');
        this.list = null;
        this.tTong = 0;
    }
    
  }
  public updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.list));
    this.sweetAlertService.showSuccessAlert(
      'Thành công',
      'Đã cập nhật thông tin giỏ hàng thành công!!'
    );
  }
  public Xoa(maSanPham: any) {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
    }).then((result) => {
      if (result.isConfirmed) {
        // Người dùng xác nhận xóa
        var index = this.list.findIndex((x: any) => x.id == maSanPham);
        if (index >= 0) {
          this.list.splice(index, 1);
          this.tTong = this.list.reduce((sum: any, x: any) => sum + x.price, 0);
          // localStorage.clear();
        }

      }
    });

   
   
  }

  
}
// this.sweetAlertService.showErrorAlert(
//   'Lỗi',
//   'Thông báo lỗi.'
// );