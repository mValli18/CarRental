import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.scss']
})
export class GetBookingsComponent implements OnInit {

  size: NzButtonSize = 'large';
  isSpinning: boolean;
  bookings: any

  constructor(private message: NzMessageService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.adminService.getBookings().subscribe((res) => {
      this.bookings = res;
      console.log(res);
    })
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.isSpinning = true;
    this.adminService.changeBookingStatus(bookingId, status).subscribe((res) => {
      this.isSpinning = false;
      this.getBookings();
      this.message
        .success(
          `Booking status changed successfully.`,
          { nzDuration: 5000 }
        );
    }, error => {
      this.message
        .error(
          `${error.eror}`,
          { nzDuration: 5000 }
        )
    })
  }

}
