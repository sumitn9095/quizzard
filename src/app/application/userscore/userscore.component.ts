import { Component, OnInit } from '@angular/core';
import { UserscoreService } from './userscore.service';
import { Router } from '@angular/router';
import { UserScore } from '../shared/user-score';
import { QuizroundService } from '../quizround/quizround.service';
import { ApplicationService } from '../application.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-userscore',
  templateUrl: './userscore.component.html',
  styleUrls: ['./userscore.component.scss'],
})
export class UserscoreComponent implements OnInit {
  public items: any;
  public user_score_details: any = {};
  public user_prev_score: number = 0;
  constructor(
    private _userScore: UserscoreService,
    private _router: Router,
    private _quizService: QuizroundService,
    private _appService: ApplicationService
  ) {}

  ngOnInit(): void {
    // this._userScore.items.pipe(map((d) => d.reverse())).subscribe((f) => {
    //   this.items = f;
    // });
    this.user_score_details = this._appService.fetch_user_score_details();
    console.log('this.items', this.items);

    this._userScore.fs_get_score().subscribe((r: any) => {
      console.log('fs_get_score', r);
      this.items = r;
    });
  }

  retry() {
    localStorage.removeItem(`user_score`);
    localStorage.removeItem(`user_game_progress`);
    this._quizService.update_round();
    this._router.navigate([`../application/quizround/1`]);
  }
}
