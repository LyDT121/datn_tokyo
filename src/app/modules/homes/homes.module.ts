import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { CuahangComponent } from './cuahang/cuahang.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SwiperModule } from 'swiper/angular';
import { InformationComponent } from './information/information.component';
import {NgxPaginationModule, PaginationService} from 'ngx-pagination';



// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThanhtoanComponent } from './thanhtoan/thanhtoan.component';
import { SpLoaiComponent } from './sploai/sploai.component';
import { RegisterComponent } from './register/register.component';
import { TintucComponent } from './tintuc/tintuc.component';
import { BillComponent } from './bill/bill.component';
import { MisspassComponent } from './misspass/misspass.component';
import { StudyComponent } from './study/study.component';
import { ContactComponent } from './contact/contact.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';

@NgModule({
  declarations: [
    IndexComponent,
    DetailComponent,
    CuahangComponent,
    CartComponent,
    ThanhtoanComponent, 
    SpLoaiComponent,
    LoginComponent,
    RegisterComponent,
    TintucComponent,
    InformationComponent,
    BillComponent,
    MisspassComponent,
    StudyComponent,
    ContactComponent,
    GioithieuComponent
    
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'detail/:id', component: DetailComponent },
      { path: 'index', component: IndexComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'thanhtoan', component: ThanhtoanComponent },
      { path: 'sploai/:id', component: SpLoaiComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'tintuc', component: TintucComponent },
      { path: 'information/:id', component: InformationComponent },
      { path: 'bill', component: BillComponent },
      { path: 'misspass', component: MisspassComponent },
      { path: 'course', component: CuahangComponent },
      { path: 'study/:id', component: StudyComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'gioithieu', component: GioithieuComponent },
    ])
  ],
  
})
export class HomesModule { }
