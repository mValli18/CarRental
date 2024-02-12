import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from 'src/app/auth/guards/authCustomer/customer.guard';
import { BookCarComponent } from './components/book-car/book-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UserDashboradComponent } from './components/user-dashborad/user-dashborad.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const routes: Routes = [
  { path: 'dashboard', component: UserDashboradComponent, canActivate: [CustomerGuard] },
  { path: 'book/:carId', component: BookCarComponent, canActivate: [CustomerGuard] },
  { path: 'bookings', component: MyBookingsComponent, canActivate: [CustomerGuard] },
  { path: 'search', component: SearchCarComponent, canActivate: [CustomerGuard] },
  { path: 'contactus', component: ContactUsComponent, canActivate: [CustomerGuard] },
  { path: 'reset', component:PasswordResetComponent, canActivate: [CustomerGuard] },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
