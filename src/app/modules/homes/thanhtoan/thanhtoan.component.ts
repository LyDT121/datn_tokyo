import { AfterViewInit, Component, Injector, OnChanges, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { CartService } from 'src/app/core/services/cart.service';
import { SendService } from 'src/app/core/services/send.service';
import { ApiService } from './../../../core/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent extends BaseComponent implements OnInit {
  public frmKhach: any;
  public student:any;
  public isCreate = false;
  public showUpdateModal: any = false;
  public doneSetupForm: any;
  public frmStudent!: FormGroup;
  public frmSearch!: FormGroup;
  public list_items: any;
  public tTong: any;
  public user:any;  
  constructor(injector: Injector) {
    super(injector);
  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')||'');

    const local_storage : any = localStorage.getItem('cart');
    
    this.list_items = JSON.parse(local_storage || []); 
    this.tTong = this.list_items.reduce((sum:any, x:any) => sum + x.price, 0);
  }
  get hoten() {
    return this.frmKhach.get('txt_hoten')!;
  }
  get sodienthoai() {
    return this.frmKhach.get('txt_sdt')!;
  }
  get email() {
    return this.frmKhach.get('txt_email')!;
  }
  get diachi() {
    return this.frmKhach.get('txt_diachi')!;
  }
  
  public openUpdateModal(id: any) {
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createSanPhamModal').modal('toggle');
      this.doneSetupForm = true;
      this.frmKhach = new FormGroup({
        'txt_hoten': new FormControl(this.user.name, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        'txt_sdt': new FormControl(this.user.phone, [Validators.required]),
        'txt_email': new FormControl(this.user.email, [Validators.required]),
        'txt_diachi': new FormControl(this.user.address, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
          
      });
    });
  }

  public DatHang() {
    // let now = new Date();    
    // var str = `
    // <html>

    // <head>
    //     <style>
    //         * {
    //             margin: 0;
    //             padding: 0;
    //             color: black;
    //         }
    
    //         table {
    //             margin-top: 15px;
    //             width: 100%;
    //         }
    
    //         body {
    //             width: 900px;
    //             margin: 0 auto;
    //         }
    
    //         tr {
    //             line-height: 27px;
    //         }
    
    //         table,
    //         th,
    //         td {
    //             border: 1px solid black;
    //             border-collapse: collapse;
    //             text-align: center;
    //         }
    
    //         .ban {
    //             font-style: italic;
    //             font-size: 15px;
    //             margin: 3px 0px;
    //         }
    
    //         .dam {
    //             font-weight: bold;
    //         }
    
    //         .le {
    //             margin-bottom: 4px;
    //             font-size: 15px;
    //         }
    
    //         .doi {
    //             width: 50%;
    //             float: left;
    //         }
    
    //         .ky {
    //             text-align: center;
    //             margin-top: 20px;
    //         }
    
    //         .ky1 {
    //             font-style: italic;
    //             text-align: center;
    //             margin-top: 5px;
    //         }
    //     </style>
    // </head>
    
    // <body>
    //     <section style="text-align: center;">
    //         <h1>HÓA ĐƠN ĐĂNG KÝ KHÓA HỌC</h1>
    //         <div class="ban">(Bản thể hiện hóa đơn điện tử)</div>
    //     </section>
    
    //     <div class="le dam">BÊN A : TRUNG TÂM TIN HỌC TOKYO</div>
    //     <div class="le">Mã số thuế: 0123456787-123</div>
    //     <div class="le">Địa chỉ: Số 1, Giang Văn Minh, Phường Kim Mã, Quận Ba Đình, Hà Nội</div>
    //     <div class="le doi">Điện thoại: 0333.460.125</div>
    //     <div class="le doi">Số tài khoản: 19036042839014</div>
    //     <div class="le dam">BÊN B: ` + this.user.name + `</div>
    //     <div class="le">Email: ` + this.user.email + `</div>
    //     <div class="le">Điện thoại: `+ this.user.phone + `</div>
    //     <div class="le">Địa chỉ: ` + this.user.address + `</div>
    //     <div class="le doi">Hình thức thanh toán: Trực tuyến</div>
    //     <div class="le">Ngày tạo: ` + now.toLocaleDateString() + ` ` + now.toLocaleTimeString() + `</div>
    //     <table>
    //         <tr>
    //             <th>STT</th>
    //             <th>Khóa học</th>
    //             <th>Thành tiền</th>
    //         </tr>`
    // var n = 0;
    // var t = 0;
    // var sl = 0;
    // for (let index = 0; index < this.list_items.length; index++) {
    //   const element = this.list_items[index];
    //   t += element.price;
    //   sl += element.countLesson;
    //   str += `
    //   <tr>
    //       <td>`+ (++n) + `</td>
    //       <td>`+ element.name + `</td>
    //       <td>`+ element.price + `</td>
    //   </tr>
    //   `;
    // }
    // str += `
    //     <tr>
    //         <td></td>
    //         <td class="dam">Tổng</td>
    //         <td class="dam">`+ t + `</td>
    //     </tr>
    // </table>
    // <div class="doi dam ky">Người mua hàng</div>
    // <div class="doi dam ky">Người bán hàng</div>
    // <div class="doi ky1">(Ký, ghi rõ họ tên)</div>
    // <div class="doi ky1">(Ký, ghi rõ họ tên)</div>
    // <div class="doi ky1"></div>
    // <div class="doi ky1">Ly</div>
    // <div class="doi ky1"></div>
    // <div class="doi ky1">Đỗ Thị Ly</div>

    // </body>

    // </html>
    // `;
    
    // const mail: FormData = new FormData();
    // mail.append('ToEmail', this.user.email);
    // mail.append('Subject', "Thông báo đặt hàng thành công");
    // mail.append('Body', str);
    // // mail.append('Body', "Bạn đã đặt thành công đơn hàng!");
    // mail.append('Attachments', "");
    let obj:any = {};
    let paymentObj:any = {};
    paymentObj = {
      orderType: "1",
      amount: this.tTong,
      orderDescription: "string",
      name: "string"
    }
    this._api.post("/api/Payment/vnpay", paymentObj).subscribe((paymentUrl:any) => {
      window.location.href = paymentUrl.data;
      // this.list_items.map((course_info:any) => { 
        // let payment = paymentObj;
        // this._api.sendMail('/api/Email/Send', mail).subscribe(res1 => {
        //   // localStorage.removeItem("cart");
        //    location.reload();
        // });
        // obj = {
        //   student_id: this.user.id,
        //   course_id: course_info.id
        // };
        // this._api.post("/api/RegisterCourse/registed-course", obj).subscribe(res => {
        //   alert("success"); 
  
        let now = new Date();    
    var str = `
    <html>

    <head>
        <style>
            * {
                margin: 0;
                padding: 0;
                color: black;
            }
    
            table {
                margin-top: 15px;
                width: 100%;
            }
    
            body {
                width: 900px;
                margin: 0 auto;
            }
    
            tr {
                line-height: 27px;
            }
    
            table,
            th,
            td {
                border: 1px solid black;
                border-collapse: collapse;
                text-align: center;
            }
    
            .ban {
                font-style: italic;
                font-size: 15px;
                margin: 3px 0px;
            }
    
            .dam {
                font-weight: bold;
            }
    
            .le {
                margin-bottom: 4px;
                font-size: 15px;
            }
    
            .doi {
                width: 50%;
                float: left;
            }
    
            .ky {
                text-align: center;
                margin-top: 20px;
            }
    
            .ky1 {
                font-style: italic;
                text-align: center;
                margin-top: 5px;
            }
        </style>
    </head>
    
    <body>
        <section style="text-align: center;">
            <h1>HÓA ĐƠN ĐĂNG KÝ KHÓA HỌC</h1>
            <div class="ban">(Bản thể hiện hóa đơn điện tử)</div>
        </section>
    
        <div class="le dam">BÊN A : TRUNG TÂM TIN HỌC TOKYO</div>
        <div class="le">Mã số thuế: 0123456787-123</div>
        <div class="le">Địa chỉ: Số 1, Giang Văn Minh, Phường Kim Mã, Quận Ba Đình, Hà Nội</div>
        <div class="le doi">Điện thoại: 0333.460.125</div>
        <div class="le doi">Số tài khoản: 19036042839014</div>
        <div class="le dam">BÊN B: ` + this.user.name + `</div>
        <div class="le">Email: ` + this.user.email + `</div>
        <div class="le">Điện thoại: `+ this.user.phone + `</div>
        <div class="le">Địa chỉ: ` + this.user.address + `</div>
        <div class="le doi">Hình thức thanh toán: Trực tuyến</div>
        <div class="le">Ngày tạo: ` + now.toLocaleDateString() + ` ` + now.toLocaleTimeString() + `</div>
        <table>
            <tr>
                <th>STT</th>
                <th>Khóa học</th>
                <th>Thành tiền</th>
            </tr>`
    var n = 0;
    var t = 0;
    var sl = 0;
    for (let index = 0; index < this.list_items.length; index++) {
      const element = this.list_items[index];
      t += element.price;
      sl += element.countLesson;
      str += `
      <tr>
          <td>`+ (++n) + `</td>
          <td>`+ element.name + `</td>
          <td>`+ element.price + `</td>
      </tr>
      `;
    }
    str += `
        <tr>
            <td></td>
            <td class="dam">Tổng</td>
            <td class="dam">`+ t + `</td>
        </tr>
    </table>
    <div class="doi dam ky">Người mua hàng</div>
    <div class="doi dam ky">Người bán hàng</div>
    <div class="doi ky1">(Ký, ghi rõ họ tên)</div>
    <div class="doi ky1">(Ký, ghi rõ họ tên)</div>
    <div class="doi ky1"></div>
    <div class="doi ky1">Ly</div>
    <div class="doi ky1"></div>
    <div class="doi ky1">Đỗ Thị Ly</div>

    </body>

    </html>
    `;
    
    const mail: FormData = new FormData();
    mail.append('ToEmail', this.user.email);
    mail.append('Subject', "Thông báo đặt hàng thành công");
    mail.append('Body', str);
    // mail.append('Body', "Bạn đã đặt thành công đơn hàng!");
    mail.append('Attachments', "");

          this._api.sendMail('/api/Email/Send', mail).subscribe(res1 => {
            // localStorage.removeItem("cart");
            //  location.reload();
          });
        // }); 
            
      // localStorage.clear();
      // })
    })
    
    

  }
 
}
