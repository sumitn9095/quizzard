import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public user_details: any;
  constructor(private _appService: ApplicationService) {}

  ngOnInit(): void {
    this.user_details = this._appService.fetch_user_score_details();
    console.log('this.user_details', this.user_details);
  }
}
