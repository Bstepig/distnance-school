import { CommonModule } from '@angular/common';
import { MgtComponent } from './mgt.component';
import { MgtRoutingModule } from './mgt-routing.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MgtComponent],
  imports: [CommonModule, MgtRoutingModule, TranslateModule],
})
export class MgtModule {}
