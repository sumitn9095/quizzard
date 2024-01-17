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
import { fromEvent, Observable, pipe } from 'rxjs';
import { takeWhile, map, filter, take, skip } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../application.service';
import { QuizroundService } from './quizround.service';
import { UserscoreService } from '../userscore/userscore.service';
import { last, first, switchMap, shareReplay, skipWhile} from 'rxjs/operators';
declare var anime: any;

@Component({
  selector: 'app-quizround',
  templateUrl: './quizround.component.html',
  styleUrls: ['./quizround.component.scss'],
})
export class QuizroundComponent implements OnInit {
  public clickedOnce: boolean = false;
  public buttonSubscription: any = null;
  public quiz_data: any[] = [];
  public user_score_details: any = {};
  public question: any;
  public options: any[] = [];
  public qset: Object = {};
  public quizSetData : any = {};
  public round_num: number = 1;

  // User gaining score for every right answer given
  public score_gain: number = 20;
  // User loosing score for every wrong answer given
  public score_loose: number = 5;

  public scored_round_points: number = 0;

  constructor(
    private router: Router,
    //private _ar: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private r2: Renderer2,
    private _appService: ApplicationService,
    private _quizService: QuizroundService,
    private _userScoreService: UserscoreService
  ) {}

  ngOnInit(): void {
    this._quizService.items
    .pipe( take(1))
    .subscribe((e: any) => {
      this.quiz_data = [];
    });
    this.quiz_data = this._quizService.quizData;
      // this._quizService.items
      // .pipe( skipWhile(v => !v), skip(1))
      // .subscribe((e: any) => {
      //   if(e?.q != undefined) this.quiz_data.push(e?.q);
      // });
    //this._quizService.items.complete();
    //console.log("this.quiz_data",this.quiz_data);
    this.options = [];
    this.question = '';
    this.round_progress(true);
    this.handleOptionChosen(document);
    
    this._quizService.gameDetailsBs
    .pipe(skipWhile(v => !v))
    .subscribe((e:any)=>{
      console.log("retrying",e);
      if(e != undefined && e.gameStatus == 'restart') {
        console.log("retrying",e);
        this.options = [];
        this.question = '';
        this.round_progress(true);
        this.handleOptionChosen(document);
      } else if(e != undefined && e.gameStatus == 'end') {
        this._quizService.round_num = this.quiz_data.length;
        this.options = [];
        this.question = '';
        this.round_progress(true);
        this.handleOptionChosen(document);
      }
    })

    this.cd.detectChanges();
  }

  fetch_qset(index: number) {
    setTimeout(() => {
      let ix = index;
      console.log('---------', index, ix, this.quiz_data, this.quiz_data[ix]);
      if(this.quiz_data[ix] != undefined && this.quiz_data[ix].options != undefined && this.quiz_data[ix].question != undefined){
        this.options = this.quiz_data[ix].options;
        this.question = this.quiz_data[ix].question;
        //this.quizSetData = this.quiz_data[ix].options;
        this.quizSetData = { 
          question : this.question,
          options :  this.options
        }
      }
    }, 5000);
  }

  // shuffle(array: any[]) {
  //   let currentIndex = array.length,randomIndex;

  //   // While there remain elements to shuffle...
  //   while (currentIndex != 0) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }

  //   return array;
  // }

  round_progress(first?:boolean) {
    let rn: number;
    if(first) {
      rn = this._quizService.round_num;
    } else {
      rn = this._quizService.round_increment();
    }
    let game = {round:rn};
    sessionStorage.setItem('game', JSON.stringify(game));

    this.round_num = rn + 1;
    this._quizService.update_round();

    this.fetch_qset(rn);
    //console.log("this.quiz_data",this.quiz_data);
   
    // Round info animation

    var quiz_round_info = document.querySelector('.quiz-round-info');
    var quiz_round_num = document.querySelector('.quiz-round-num');
    var quiz_option = document.querySelector('.quiz-option');
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

  handleOptionChosen(val: any) {
    var handleOptionChosen = val.target ? val.target.parentElement : null;
    var handleOptionChosen_id = val.target ? val.target.parentElement.id : null;
    // console.log(
    //   'button subscribe',
    //   val,
    //   'all options',
    //   this.options,
    //   'this option',
    //   handleOptionChosen_id
    // );
    if (handleOptionChosen_id) {
      this.process_result(handleOptionChosen_id);
      
      // this.r2.setStyle(
      //   handleOptionChosen,
      //   '',
      //   'selected'
      // );
      // this.r2.setAttribute(
      //   handleOptionChosen,
      //   'class',
      //   'selected'
      // );

      this.r2.addClass(handleOptionChosen, 'selected');
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
        if (this._quizService.round_num >= this.quiz_data.length - 1) {
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
          this.quiz_data = [];
          this.router.navigate([`./application/userscore`]);
        } else {
          // this.router.navigate([
          //   `./application/quizround/${++this._quizService.round_num}`,
          // ]);
          this.round_progress();
        }
        console.log('this._quizService.round_num', this._quizService.round_num);
      }, 4000);

      this.clickedOnce = true;

      // this.buttonSubscription.unsubscribe();
    }
  }
}
