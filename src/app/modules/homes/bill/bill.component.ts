import { ApiService } from './../../../core/services/api.service';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/common/base-component';
import { SweetAlertService } from 'src/app/core/services/SweetAlert.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent extends BaseComponent implements OnInit {
  public frmKhach: any;
  public student:any;
  public isCreate = false;
  
  public showUpdateModal: any = false;
  public doneSetupForm: any;
  public list_items: any;
  public tTong: any;
  public user:any;
  public item!: {
    vnp_Amount: string;
    vnp_BankCode: string;
    vnp_BankTranNo: string;
    vnp_CardType: string;
    vnp_OrderInfo: string;
    vnp_PayDate: string;
    vnp_ResponseCode: string;
    vnp_TmnCode: string;
    vnp_TransactionNo: string;
    vnp_TransactionStatus: string;
    vnp_TxnRef: string;
    vnp_SecureHash: string;
  } ;
  constructor(injector: Injector, private route: ActivatedRoute, private sweetAlertService: SweetAlertService, private _router: Router) {
    super(injector);
  }

  ngOnInit(): void {
    const local_storage : any = localStorage.getItem('cart');
    this.list_items = JSON.parse(local_storage || []); 
    this.tTong = this.list_items.reduce((sum:any, x:any) => sum + x.price, 0);

    this.user = JSON.parse(localStorage.getItem('user')||'');
    
    this.DatHang();
  }


  public DatHang() {
    this.item = {
      vnp_Amount: '',
      vnp_BankCode: '',
      vnp_BankTranNo: '',
      vnp_CardType: '',
      vnp_OrderInfo: '',
      vnp_PayDate: '',
      vnp_ResponseCode: '',
      vnp_TmnCode: '',
      vnp_TransactionNo: '',
      vnp_TransactionStatus: '',
      vnp_TxnRef: '',
      vnp_SecureHash: '',
    };
    this.route.queryParams.subscribe(param => {
      this.item.vnp_Amount = param['vnp_Amount'];
      this.item.vnp_BankCode = param['vnp_BankCode'];
      this.item.vnp_BankTranNo = param['vnp_BankTranNo'];
      this.item.vnp_CardType = param['vnp_CardType'];
      this.item.vnp_OrderInfo = param['vnp_OrderInfo'];
      this.item.vnp_PayDate = param['vnp_PayDate'];
      this.item.vnp_ResponseCode = param['vnp_ResponseCode'];
      this.item.vnp_TmnCode = param['vnp_TmnCode'];
      this.item.vnp_TransactionNo = param['vnp_TransactionNo'];
      this.item.vnp_TransactionStatus = param['vnp_TransactionStatus'];
      this.item.vnp_TxnRef = param['vnp_TxnRef'];
      this.item.vnp_SecureHash = param['vnp_SecureHash'];
      let obj:any = {};
      this._api
        .post('/api/Payment/payment-confirm', {
          params: param,
          observe: 'response',
        })
        .subscribe(res => {
          //kiểm tra responseCode == 00 ; thành công
          if(this.item.vnp_ResponseCode == "00") {
            this.list_items.map((course_info: any) => {
              obj = {
                student_id: this.user.id,
                course_id: course_info.id
              };
              console.log('list_items', this.list_items);
              console.log('obj', obj);
              
              this._api.post("/api/RegisterCourse/registed-course", obj).subscribe(res => {
  
              });
            })
            this.sweetAlertService.showSuccessAlert(
              'Thành công',
              'Đặt hàng thành công!'
            );

          } else {
            alert("Fail");
          }
          
        });
    });
   
  }
public Done(){
  localStorage.setItem('cart',''); 

  this._router.navigate(['/homes/index']);

  // location.reload();

}
}
