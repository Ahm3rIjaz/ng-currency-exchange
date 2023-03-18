import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotificationService } from './services/notification.service';

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
  providers: [
    [
      { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
    ],
    NotificationService
  ],
})
export class SharedModule { }
