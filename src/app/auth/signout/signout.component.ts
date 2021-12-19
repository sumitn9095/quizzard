import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss'],
})
export class SignoutComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._auth.signOut().then(() => {
      console.log(`user SIGNED_OUT`);
    });
  }
}
