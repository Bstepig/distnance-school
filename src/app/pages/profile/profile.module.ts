import { CommonModule } from '@angular/common';
import { DefaultImageModule } from '@shared/directives';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TranslateModule,
    DefaultImageModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
