import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Renderer2,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewChild,
} from '@angular/core';
//import * as quizdata from './quiz.json';

import { fromEvent, Observable, pipe } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../application.service';
import { QuizroundService } from './quizround.service';
import { UserscoreService } from '../userscore/userscore.service';

declare var anime: any;

@Component({
  selector: 'app-quizround',
  templateUrl: './quizround.component.html',
  styleUrls: ['./quizround.component.scss'],
})
export class QuizroundComponent implements OnInit {
  public clickedOnce: boolean = false;
  public buttonSubscription: any = null;
  public quizdata: any[] = [
    {
      question: 'What is A ?',
      options: [
        {
          id: 1,
          name: 'A letter',
          correct: true,
        },
        {
          id: 2,
          name: 'D letter',
        },
        {
          id: 3,
          name: 'E letter',
        },
        {
          id: 4,
          name: 'G letter',
        },
      ],
    },
    {
      question: 'What is R ?',
      options: [
        {
          id: 1,
          name: 'S letter',
        },
        {
          id: 2,
          name: 'R letter',
          correct: true,
        },
        {
          id: 3,
          name: 'N letter',
        },
        {
          id: 4,
          name: 'K letter',
        },
      ],
    },
    {
      question: 'What is S ?',
      options: [
        {
          id: 1,
          name: 'S letter',
        },
        {
          id: 2,
          name: 'R letter',
        },
        {
          id: 3,
          name: 'S letter',
          correct: true,
        },
        {
          id: 4,
          name: 'K letter',
        },
      ],
    },
    {
      question: 'What is Z ?',
      options: [
        {
          id: 1,
          name: 'S letter',
        },
        {
          id: 2,
          name: 'R letter',
        },
        {
          id: 3,
          name: 'S letter',
        },
        {
          id: 4,
          name: 'Z letter',
          correct: true,
        },
      ],
    },
    {
      question: 'What is T ?',
      options: [
        {
          id: 1,
          name: 'T letter',
          correct: true,
        },
        {
          id: 2,
          name: 'R letter',
        },
        {
          id: 3,
          name: 'S letter',
        },
        {
          id: 4,
          name: 'Z letter',
        },
      ],
    },
  ];
  public question: string = '';
  public options: any[] = [];
  public qset: Object = {};

  public round_num: number = 1;

  // User gaining score for every right answer given
  public score_gain: number = 20;
  // User loosing score for every wrong answer given
  public score_loose: number = 5;

  public scored_round_points: number = 0;

  constructor(
    private router: Router,
    private _ar: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private r2: Renderer2,
    private _appService: ApplicationService,
    private _quizService: QuizroundService,
    private _userScoreService: UserscoreService
  ) {}

  ngAfterViewInit() {
    var quiz_round_info = document.querySelector('.quiz-round-info');
    var quiz_round_num = document.querySelector('.quiz-round-num');
    this.shuffle(this.quizdata);
    this.options = [];
    this._ar.params.subscribe((f: any) => {
      this._quizService.round_num = f.num;
      console.log('this.round_num', this._quizService.round_num);
      this.question = this.quizdata[this._quizService.round_num - 1].question;
      this.options = this.quizdata[this._quizService.round_num - 1].options;
      this.round_progress();
      // Round info animation
      var fr = anime.timeline({
        duration: 1200,
      });
      fr.add({
        targets: quiz_round_info,
        opacity: [0, 1],
        translateY: ['-100vh', 0],
        duration: 1200,
      })
        .add({
          targets: quiz_round_num,
          scale: [0, 1],
          duration: 1200,
        })
        .add({
          targets: quiz_round_num,
          scale: [1, 0],
          duration: 1200,
          delay: 2000,
        })
        .add(
          {
            targets: quiz_round_info,
            opacity: [1, 0],
            translateY: [0, '-100vh'],
            duration: 1200,
          },
          '-=1000'
        );
    });
    this.option_chosen(document);
    console.log('qset', this.qset);

    this.cd.detectChanges();
  }

  ngOnInit(): void {
    console.log('quizdata', this.quizdata);
  }

  shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  round_progress() {
    this.round_num = this._quizService.round_num;
    this._quizService.update_round();
  }

  process_result(chosen_option_index: string) {
    this.scored_round_points = 0;
    //console.log('chosen_option_index', chosen_option_index);
    let oopi = parseInt(chosen_option_index);
    this.options[oopi - 1].selected = true;
    this.options.filter((f) => {
      if (f.correct == true) {
        let ddf = f;
        f.answer = `right`;
        console.log(ddf, parseInt(chosen_option_index));
        if (ddf.id === parseInt(chosen_option_index)) {
          console.log('A MATCH');
          f.user = `right`;
          this.scored_round_points = this.score_gain;
        }
      }
    });
  }

  option_chosen(val: any) {
    var option_chosen = val.target ? val.target.parentElement : null;

    var option_chosen_id = val.target ? val.target.parentElement.id : null;

    if (option_chosen_id) {
      this.process_result(option_chosen_id);
      console.log(
        'button subscribe',
        val,
        'all options',
        this.options,
        'this option',
        option_chosen_id
      );
      // this.r2.setStyle(
      //   option_chosen,
      //   '',
      //   'selected'
      // );
      // this.r2.setAttribute(
      //   option_chosen,
      //   'class',
      //   'selected'
      // );

      this.r2.addClass(option_chosen, 'selected');
      this._quizService.add_score(
        this._quizService.round_num,
        this.question,
        this.options,
        this.scored_round_points
      );

      setTimeout(() => {
        this.clickedOnce = false;
        this.options = [];
        if (this._quizService.round_num >= 5) {
          this._userScoreService.add_user_score();
          this.router.navigate([`./application/userscore`]);
        } else {
          this.router.navigate([
            `./application/quizround/${++this._quizService.round_num}`,
          ]);
          this.round_progress();
        }
      }, 4000);
      this.clickedOnce = true;

      // this.buttonSubscription.unsubscribe();
    }
  }
}
