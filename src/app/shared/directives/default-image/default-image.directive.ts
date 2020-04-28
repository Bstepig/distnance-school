import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@env';

@Directive({
  selector: 'image[msDefault]',
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src',
  },
})
export class DefaultImageDirective {
  @Input() src: string;
  @Input('msDefault') default: string = 'assets/images/default/no_photo.png';
  constructor() {}

  updateUrl() {
    this.src = this.default;
  }
}

@Directive({
  selector: '[bgUrl]',
})
export class DefaultBackgroundImageDirective implements OnInit {
  ngOnInit(): void {}

  @Input('bgUrl') set src(value: string) {
    this._src = value;
    if (this._afterInit) this._update();
  }
  private _src: string;
  @Input() default: string = '';
  @Input() base: boolean = false;
  private _afterInit: boolean = false;
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this._afterInit = true;
    this._update();
  }

  private _update() {
    const im = new Image();
    const url = (this.base ? environment.apiUrl : '') + this._src;
    im.onload = (ev) => {
      this.el.nativeElement.style.backgroundImage = 'url(' + url + ')';
    };
    im.onerror = (ev) => {
      if (this.default)
        this.el.nativeElement.style.backgroundImage =
          'url(' + this.default + ')';
    };
    im.src = url;
  }
}
