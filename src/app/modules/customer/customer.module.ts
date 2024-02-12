import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/DemoNgZorroAntdModule';
import { BookCarComponent } from './components/book-car/book-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UserDashboradComponent } from './components/user-dashborad/user-dashborad.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';


@NgModule({
  declarations: [
    BookCarComponent,
    MyBookingsComponent,
    UserDashboradComponent,
    SearchCarComponent,
    ContactUsComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule
  ]
})
export class CustomerModule { }
