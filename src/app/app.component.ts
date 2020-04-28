import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _translate: TranslateService) {
    _translate.addLangs(['en', 'ru']);
    _translate.setDefaultLang('ru');

    const browserLang = _translate.getBrowserLang();
    _translate.use(browserLang.match(/en|ru/) ? browserLang : 'ru');
  }
}
