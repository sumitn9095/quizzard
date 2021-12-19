import { Component, OnInit } from '@angular/core';

import { QuizroundService } from '../../../quizround/quizround.service';

@Component({
  selector: 'application-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public score: number = 0;
  public round: number = 1;
  constructor(private _quizService: QuizroundService) {}

  ngOnInit(): void {
    // this.score = this._appService.read_key(`user_score`);
    // let user_game_progress = [];
    // user_game_progress = this._appService.read_key(`user_game_progress`);
    // this.round = user_game_progress[user_game_progress.length - 1].round;

    this._quizService.gameDetailsBs.subscribe((s) => {
      console.log('s', s);
      this.score = s.score;
      this.round = s.round;
    });
  }
}
