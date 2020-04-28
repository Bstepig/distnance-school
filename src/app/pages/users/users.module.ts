import { CommonModule } from '@angular/common';
import { DefaultImageModule } from '@shared/directives';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, TranslateModule, DefaultImageModule, FormsModule],
})
export class UsersModule {}
