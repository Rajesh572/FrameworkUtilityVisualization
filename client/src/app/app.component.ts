import { Component } from '@angular/core';
import { SetLoaderService } from './Services/setLoader/set-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FWvisualize';
  flag: any;
  constructor(public setLoader: SetLoaderService){
    this.setLoader.setLoaderFlag.subscribe(data => this.flag = data);
  }
}
