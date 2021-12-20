import { Component, OnInit } from '@angular/core';
import { UserscoreService } from './userscore.service';
import { Router } from '@angular/router';
import { UserScore } from '../shared/user-score';
import { QuizroundService } from '../quizround/quizround.service';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, toArray, mergeMap } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-userscore',
  templateUrl: './userscore.component.html',
  styleUrls: ['./userscore.component.scss'],
})
export class UserscoreComponent implements OnInit {
  public items: any;
  public user_score_details: any = {};

  constructor(
    private _userScore: UserscoreService,
    private _router: Router,
    private _quizService: QuizroundService
  ) {}

  ngOnInit(): void {
    this._userScore.items.pipe(map((d) => d.reverse())).subscribe((f) => {
      this.items = f;
    });
    this.user_score_details = this._userScore.fetch_user_score_details();
    console.log('this.items', this.items);
  }

  retry() {
    localStorage.removeItem(`user_score`);
    localStorage.removeItem(`user_game_progress`);
    this._quizService.update_round();
    this._router.navigate([`../application/quizround/1`]);
  }
}
