import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  public user_is_logged_in: Boolean = false;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    localStorage.getItem('user')
      ? (this.user_is_logged_in = true)
      : (this.user_is_logged_in = false);
  }

  sign_out() {
    this._router.navigate([`../../../auth/signout`]);
  }

  as() {
    let user_score = localStorage.getItem('user_score');
    let user = localStorage.getItem('user');
    let userthis = JSON.parse(user ? user : '');
    return { user_score: user_score, email: userthis.email };
  }
}
