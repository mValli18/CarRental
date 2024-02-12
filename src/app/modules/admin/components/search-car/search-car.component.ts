import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {

  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  isSpinning = false;
  size: NzButtonSize = 'large';
  validateForm!: FormGroup;
  cars: any = [];

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    });
  }

  searchCar() {
    console.log(this.validateForm.value);
    this.isSpinning = true;
    this.adminService.searchCar(this.validateForm.value).subscribe((res) => {
      res.carDtoList.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
      console.log(res)
      this.isSpinning = false;
    })
  }

}
