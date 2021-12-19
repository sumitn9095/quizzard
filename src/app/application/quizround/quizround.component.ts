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
      this._quizService.round_num = f.num;
      console.log('this.round_num', this._quizService.round_num);
      this.question = this.quizdata[this._quizService.round_num - 1].question;
      this.options = this.quizdata[this._quizService.round_num - 1].options;
    });
    this.option_chosen(document);
    console.log('qset', this.qset);

    this.cd.detectChanges();
  }

  ngOnInit(): void {
    console.log('quizdata', this.quizdata);
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
        this.router.navigate([
          `./application/quizround/${++this._quizService.round_num}`,
        ]);
        this._quizService.update_round();
      }, 4000);
      this.clickedOnce = true;

      // this.buttonSubscription.unsubscribe();
    }
  }
}
