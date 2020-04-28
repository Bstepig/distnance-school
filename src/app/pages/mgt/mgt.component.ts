import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { userType } from '@core/models';

@Component({
  selector: 'ds-mgt',
  templateUrl: './mgt.component.html',
  styleUrls: ['./mgt.component.scss'],
})
export class MgtComponent implements OnInit {
  langs: string[];

  readonly LINKS: Record<
    string,
    {
      name: string;
      icon: string;
    }
  > = {
    lessons: {
      name: 'lessons',
      icon: 'fa-bell',
    },
    tasks: {
      name: 'tasks',
      icon: 'fa-calendar-check',
    },
    schedule: {
      name: 'schedule',
      icon: 'fa-calendar-alt',
    },
    profile: {
      name: 'profile',
      icon: 'fa-user',
    },
    classes: {
      name: 'classes',
      icon: 'fa-chalkboard-teacher',
    },
    users: {
      name: 'users',
      icon: 'fa-users',
    },
  };

  LINKS_TYPES: Record<userType, string[]> = {
    A: ['profile'],
    D: ['tasks', 'schedule', 'users', 'classes', 'profile'],
    T: ['tasks', 'schedule', 'profile'],
    S: ['tasks', 'schedule', 'profile'],
    P: ['profile'],
  };

  sidebar: {
    name: string;
    icon: string;
  }[];

  constructor(
    private _translate: TranslateService,
    private _authService: AuthService
  ) {
    this.langs = this._translate.langs;
    const links = this.LINKS_TYPES[this._authService.userType];
    this.sidebar = links.map((name) => this.LINKS[name]);
  }

  showLessons: boolean;

  ngOnInit(): void {}

  isLangActive(lang: string): boolean {
    return this._translate.currentLang === lang;
  }

  setLang(lang: string): void {
    this._translate.use(lang);
  }
}
