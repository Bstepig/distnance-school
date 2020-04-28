import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAgentService {
  constructor() {}

  private _isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(
    navigator.userAgent
  );

  get isMobile() {
    return this._isMobile;
  }
}
