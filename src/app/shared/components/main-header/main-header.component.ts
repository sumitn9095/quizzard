import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  // public user_is_logged_in: Boolean = false;
  public user: any;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) {
      // this.user_is_logged_in = true;
      this.user = user != null ? JSON.parse(user) : '';
    } else {
      // this.user_is_logged_in = false;
    }
  }

  sign_out() {
    this._router.navigate([`../../../auth/signout`]);
  }
}
