import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/utility/game';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.scss']
})
export class ModeComponent implements OnInit {
  constructor(private _router : Router) { }
  ngOnInit(): void {
  }

  chooseGame(difficulty:number) {
    var gameMode : Game = {
      mode: difficulty
    };
    sessionStorage.setItem('gameMode',JSON.stringify(gameMode));
    this._router.navigate(['../application/quizround']);
  }

}
