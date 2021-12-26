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
//import * as quiz_data from './quiz.json';

import { fromEvent, Observable, pipe } from 'rxjs';
import { takeWhile, map, filter } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../application.service';
import { QuizroundService } from './quizround.service';
import { UserscoreService } from '../userscore/userscore.service';
import { kill } from 'process';

declare var anime: any;

@Component({
  selector: 'app-quizround',
  templateUrl: './quizround.component.html',
  styleUrls: ['./quizround.component.scss'],
})
export class QuizroundComponent implements AfterViewInit {
  public clickedOnce: boolean = false;
  public buttonSubscription: any = null;
  public quiz_data: any[] = [];
  public user_score_details: any = {};
  // public quizdata: any[] = [
  //   {
  //     question: 'What is A ?',
  //     options: [
  //       {
  //         id: 1,
  //         name: 'A letter',
  //         correct: true,
  //       },
  //       {
  //         id: 2,
  //         name: 'D letter',
  //       },
  //       {
  //         id: 3,
  //         name: 'E letter',
  //       },
  //       {
  //         id: 4,
  //         name: 'G letter',
  //       },
  //     ],
  //   },
  //   {
  //     question: 'What is R ?',
  //     options: [
  //       {
  //         id: 1,
  //         name: 'S letter',
  //       },
  //       {
  //         id: 2,
  //         name: 'R letter',
  //         correct: true,
  //       },
  //       {
  //         id: 3,
  //         name: 'N letter',
  //       },
  //       {
  //         id: 4,
  //         name: 'K letter',
  //       },
  //     ],
  //   },
  //   {
  //     question: 'What is S ?',
  //     options: [
  //       {
  //         id: 1,
  //         name: 'S letter',
  //       },
  //       {
  //         id: 2,
  //         name: 'R letter',
  //       },
  //       {
  //         id: 3,
  //         name: 'S letter',
  //         correct: true,
  //       },
  //       {
  //         id: 4,
  //         name: 'K letter',
  //       },
  //     ],
  //   },
  //   {
  //     question: 'What is Z ?',
  //     options: [
  //       {
  //         id: 1,
  //         name: 'S letter',
  //       },
  //       {
  //         id: 2,
  //         name: 'R letter',
  //       },
  //       {
  //         id: 3,
  //         name: 'S letter',
  //       },
  //       {
  //         id: 4,
  //         name: 'Z letter',
  //         correct: true,
  //       },
  //     ],
  //   },
  //   {
  //     question: 'What is T ?',
  //     options: [
  //       {
  //         id: 1,
  //         name: 'T letter',
  //         correct: true,
  //       },
  //       {
  //         id: 2,
  //         name: 'R letter',
  //       },
  //       {
  //         id: 3,
  //         name: 'S letter',
  //       },
  //       {
  //         id: 4,
  //         name: 'Z letter',
  //       },
  //     ],
  //   },
  // ];
  public question: any;
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
  ) {
    this._quizService.items.pipe(map((d) => d)).subscribe((e: any[]) => {
      e.map((g: any, index) => {
        this.quiz_data.push({ options: [], question: '' });
        for (let wq in g.options) {
          this.quiz_data[index].options.push(g.options[wq]);
        }
        this.quiz_data[index].question = g.question;
      });
    });
  }

  ngAfterViewInit() {
    var quiz_round_info = document.querySelector('.quiz-round-info');
    var quiz_round_num = document.querySelector('.quiz-round-num');

    var quiz_option = document.querySelector('.quiz-option');

    //this.shuffle(this.quiz_data);
    //console.log('this.quizdata', this.quizdata[1], this.quiz_data[1]);
    this.options = [];
    this.question = '';
    this._ar.params.subscribe((f: any) => {
      ///let qqw = f.num - 1;
      // this._quizService.round_num = qqw;
      // console.log(
      //   'this.round_num',
      //   this._quizService.round_num,
      //   this.quiz_data
      // );

      this.fetch_qset(this._quizService.round_num - 1);

      // this.question = 'eeeeeeeeee ---------- 33333333333333';

      // for (let az in this.quiz_data) {
      //   //var az = this.quiz_data[this._quizService.round_num];
      //   console.log('az', az);
      //   // for (let wq in az) {
      //   //   this.options = az[wq];
      //   //   console.log('wq', wq);
      //   // }
      // }

      // console.log('this.quiz_data - this.options', this.options);

      //this.options = this.quiz_data[this._quizService.round_num - 1].options;
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
          targets: quiz_round_info,
          opacity: [1, 0],
          translateY: [0, '-100vh'],
          duration: 1200,
          delay: 2200,
        })
        .add(
          {
            targets: quiz_round_num,
            scale: [1, 0],
            duration: 1200,
          },
          '-=1500'
        );

      anime({
        targets: quiz_option,
        opacity: [0, 1],
        scale: [0.6, 1],
        duration: 1200,
        delay: anime.stagger(1200),
      });
    });
    this.option_chosen(document);
    console.log('qset', this.qset);
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    //console.log('quiz_data', this.quiz_data[1], this.quizdata);
    // setTimeout(() => {
    //   console.log('---------', this.quiz_data[1]);
    //   this.quiz_data.forEach((j) => {
    //     console.log('jj', j);
    //   });
    // }, 9000);
  }

  fetch_qset(index: number) {
    setTimeout(() => {
      //console.log('---------', this.quiz_data[index]);
      this.options = this.quiz_data[index].options;
      this.question = this.quiz_data[index].question;
    }, 5000);
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
        this.question = '';
        if (this._quizService.round_num >= 5) {
          this.user_score_details = this._appService.fetch_user_score_details();
          console.log(
            'this.user_score_details.user.email',
            this.user_score_details.user.email
          );
          this._userScoreService
            .fs_get_score()
            .pipe(
              map((i: any) => {
                return i.filter(
                  (k: any) => k.email == this.user_score_details.user.email
                );
              })
            )
            .subscribe((r: any) => {
              // get the Users old score
              // Check if the (OLD score is less than the users current score) - then add the new user's high score
              r.map((qa: any) => {
                console.log(
                  'user - details',
                  qa.user_score,
                  this.user_score_details.user.user_score
                );
                if (qa.user_score < this.user_score_details.user_score) {
                  this._userScoreService.add_user_score();
                }
              });
            });
          this.router.navigate([`./application/userscore`]);
        } else {
          this.router.navigate([
            `./application/quizround/${++this._quizService.round_num}`,
          ]);
          this.round_progress();
        }
        console.log('this._quizService.round_num', this._quizService.round_num);
      }, 4000);

      this.clickedOnce = true;

      // this.buttonSubscription.unsubscribe();
    }
  }
}
