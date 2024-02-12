import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  isSpinning = false;

  submitForm(): void {
    this.isSpinning = true;
    this.authService.login(this.validateForm.value).subscribe(
      (res) => {
        if (res.userId != null) {
          console.log(res);
          const user = {
            id: res.userId,
            role: res.userRole
          }
          console.log(user);
          UserStorageService.saveUser(user);
          UserStorageService.saveToken(res.jwt);
          if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
          }
        } else {
          this.message
            .error(
              `Bad credentials`,
              { nzDuration: 5000 }
            )
        }
        this.isSpinning = false;
      })
  }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ["user", [Validators.required]],
      password: ["user", [Validators.required]],
    });
  }

}