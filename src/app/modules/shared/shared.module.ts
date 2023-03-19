import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

const modules = [
  CommonModule,
  RouterModule,
  AngularMaterialModule,
  ReactiveFormsModule
];

const components = [
  NotFoundComponent,
  SpinnerComponent
];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...components],
  declarations: [...components],
  providers: [],
})
export class SharedModule { }
