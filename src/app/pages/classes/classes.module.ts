import { ClassesComponent } from './classes.component';
import { ClassesRoutingModule } from './classes-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ClassesComponent],
  imports: [CommonModule, ClassesRoutingModule, TranslateModule, FormsModule],
})
export class ClassesModule {}
