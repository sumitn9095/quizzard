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
      question: 'What is this Question answer ?',
      options: [
        {
          id: 1,
          name: 'this AAA',
          correct: true,
        },
        {
          id: 2,
          name: 'this BBB',
        },
        {
          id: 3,
          name: 'this CCC',
        },
      ],
    },
    {
      question: 'What is this SECOND Question answer ?',
      options: [
        {
          id: 1,
          name: 'this QQQ',
        },
        {
          id: 2,
          name: 'this MMM',
        },
        {
          id: 3,
          name: 'this XXX',
          correct: true,
        },
      ],
    },
    {
      question: 'What is this THIRD Question answer ?',
      options: [
        {
          id: 1,
          name: 'som 1',
        },
        {
          id: 2,
          name: 'som 2',
          correct: true,
        },
        {
          id: 3,
          name: 'som 3',
        },
      ],
    },
  ];
  public question: string = '';
  public options: any[] = [];
  public round_num: number = 1;
  public qset: Object = {};

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
    private _quizService: QuizroundService
  ) {}

  @ViewChild('opts') 'opts': ElementRef;

  ngAfterViewInit() {
    this.options = [];
    this._ar.params.subscribe((f: any) => {
      this.round_num = f.num;
      console.log('this.round_num', this.round_num);
      this.question = this.quizdata[this.round_num - 1].question;
      this.options = this.quizdata[this.round_num - 1].options;
    });
    this.option_chosen(document);
    console.log('qset', this.qset);

    this.cd.detectChanges();
  }

  ngOnInit(): void {
    console.log('quizdata', this.quizdata);
  }

  process_result(chosen_option_index: string) {
    console.log('chosen_option_index', chosen_option_index);
    let oopi = parseInt(chosen_option_index);
    this.options[oopi - 1].selected = true;
    this.options.filter((f) => {
      if (f.correct == true) {
        let ddf = f;
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
    let option_chosen_id = val.target
      ? val.target.parentElement.parentElement.id
      : null;

    if (option_chosen_id) {
      this.process_result(option_chosen_id);
      console.log(
        'button subscribe',
        val,
        'all options',
        this.options,
        'this option',
        val.target.parentElement.parentElement.id
      );
      // this.r2.setStyle(
      //   val.target.parentElement.parentElement,
      //   '',
      //   'selected'
      // );
      // this.r2.setAttribute(
      //   val.target.parentElement.parentElement,
      //   'class',
      //   'selected'
      // );

      this.r2.addClass(val.target.parentElement.parentElement, 'selected');
      this._quizService.add_score(this.round_num, this.question, this.options);
      this._appService.save_key(`user_score`, this._quizService.score_box);

      setTimeout(() => {
        this.clickedOnce = false;

        this.options = [];
        this.router.navigate([`./application/quizround/${++this.round_num}`]);
      }, 4000);
      this.clickedOnce = true;

      // this.buttonSubscription.unsubscribe();
    }
  }
}
