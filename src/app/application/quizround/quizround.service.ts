import { Injectable } from '@angular/core';
import { ApplicationService } from '../application.service';

import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QuizroundService {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  public round_num: number = 1;

  public game_score: number = 0;

  public score_box: any[] = [];

  public gameDetailsBs = new BehaviorSubject<any>(0);

  constructor(
    private _appService: ApplicationService,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = db.list('quizdata', (ref) => ref);
    this.items = this.itemsRef
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))));
    //this.itemsRef = db.list('quizdata', (ref) => ref);
  }

  update_round() {
    let game_details = {
      score: this.game_score,
      round: this.round_num,
    };
    this.gameDetailsBs.next(game_details);
  }

  add_score(
    round_num: number,
    question: string,
    options: any,
    scored_round_points: number
  ) {
    let user_score = this._appService.read_key(`user_score`);
    this.game_score = user_score + scored_round_points;
    this._appService.save_key(`user_score`, this.game_score);

    this.score_box.push({
      round: round_num,
      question: question,
      options: options,
    });

    this._appService.save_key(`user_game_progress`, this.score_box);
  }
}
