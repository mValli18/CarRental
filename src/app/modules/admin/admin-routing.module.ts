import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './components/add-car/add-car.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { AdminGuard } from 'src/app/auth/guards/authAdmin/admin.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'add-car', component: AddCarComponent, canActivate: [AdminGuard] },
  { path: 'update-car/:carId', component: UpdateCarComponent, canActivate: [AdminGuard] },
  { path: 'search', component: SearchCarComponent, canActivate: [AdminGuard] },
  { path: 'bookings', component: GetBookingsComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
