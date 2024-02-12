import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cars: any = [];

  constructor(private adminService: AdminService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.cars = [];
    this.adminService.getAllCars().subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
      console.log(res);
    });
  }

  deleteCar(carId: any) {
    this.adminService.deleteCarByCarId(carId).subscribe((res) => {
      this.getAllCars();
      this.message
        .success(
          `Car Deleted Successfully`,
          { nzDuration: 5000 }
        );
    })

  }
}
