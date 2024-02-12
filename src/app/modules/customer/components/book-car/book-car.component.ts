import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { UserStorageService } from 'src/app/auth/services/storage/user-storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.scss']
})
export class BookCarComponent implements OnInit {

  carId: any = this.activatedroute.snapshot.params['carId'];
  car: any
  validateForm!: FormGroup;
  processedImg: any
  dateFormat = 'yyyy-MM-dd';
  isSpinning = false;
  size: NzButtonSize = 'large';
  isVisible = false;

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private customerService: CustomerService,
    private activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
    });
    this.getCarByCarId();
  }

  getCarByCarId() {
    this.customerService.getCarByCarId(this.carId).subscribe((res) => {
      console.log(res);
      this.processedImg = 'data:image/jpeg;base64,' + res.carDto.returnedImg;
      this.car = res.carDto;
    })
  }

  bookCar(formData: any): void {
    this.isSpinning = true;
    const obj = {
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      userId: UserStorageService.getUserId(),
    }
    this.customerService.bookACar(this.carId, obj).subscribe((res) => {
      this.isSpinning = false;
      this.message
        .success(
          `Car Booked Successfully`,
          { nzDuration: 5000 }
        );
      this.router.navigateByUrl('/customer/bookings');

    }, error => {
      this.message
        .error(
          `${error.error}`,
          { nzDuration: 5000 }
        )
    });
  }
  
}


