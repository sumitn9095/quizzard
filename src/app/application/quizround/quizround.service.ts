import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizroundService {
  game_score: number = 0;

  public score_box: any[] = [];

  constructor() {}

  add_score(round_num: number, question: string, options: any) {
    this.score_box.push({
      round: round_num,
      question: question,
      options: options,
    });
  }
}
