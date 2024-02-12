import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-user-dashborad',
  templateUrl: './user-dashborad.component.html',
  styleUrls: ['./user-dashborad.component.scss']
})
export class UserDashboradComponent implements OnInit {

  cars: any = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.customerService.getAllCars().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
      console.log(res);
    });
  }

}
