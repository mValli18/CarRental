import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {

  size: NzButtonSize = 'large';
  isSpinning: boolean;
  bookedCars: any

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getMyAllBookings();
  }

  getMyAllBookings() {
    this.customerService.getBookedCarsByUserId().subscribe((res) => {
      this.bookedCars = res;
      console.log(res);
    })
  }


}
