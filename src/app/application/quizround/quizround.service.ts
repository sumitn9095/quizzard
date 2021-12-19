import { Injectable } from '@angular/core';
import { ApplicationService } from '../application.service';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QuizroundService {
  public round_num: number = 1;

  public game_score: number = 0;

  public score_box: any[] = [];

  public gameDetailsBs = new BehaviorSubject<any>(0);

  constructor(private _appService: ApplicationService) {}

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
