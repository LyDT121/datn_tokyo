import { ApiService } from './../../../core/services/api.service';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';


@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent extends BaseComponent implements OnInit,AfterViewInit {
  public list_tintuc:any;
  public list_danhgia:any;
  constructor( injector: Injector ) {
    super(injector);
    
   }

  ngOnInit(): void {
    this._api.get('/api/News/get-all-news').subscribe((res: any) => {
      this.list_tintuc = res;
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
  }
  ngAfterViewInit() { 
    //this.loadScripts('assets/js/hide_menu.js','assets/js/slide_show.js' ); 
  }

}
