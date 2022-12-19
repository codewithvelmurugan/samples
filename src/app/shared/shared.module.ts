import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphabetOnlyDirective } from './directives/alphabet-only.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStarsModule } from 'ngx-stars';


@NgModule({
  declarations: [
    AlphabetOnlyDirective,
    NumberOnlyDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarsModule
  ],
  exports:[
    AlphabetOnlyDirective,
    NumberOnlyDirective,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarsModule
  ]
})
export class SharedModule { }
