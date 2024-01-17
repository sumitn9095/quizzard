import { Injectable } from '@angular/core';
import { ApplicationService } from '../application.service';
import { Router, Routes, Route } from '@angular/router';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { AngularFirestore , AngularFirestoreCollection, DocumentChangeAction, DocumentChange} from '@angular/fire/compat/firestore';
import { collection} from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class QuizroundService {
  //itemsRef: AngularFireList<any>;
  items = new BehaviorSubject<any>({});
 // mmk : Observable<DocumentChangeAction<any>>;
  public round_num: number = 1;
  public game_score: number = 0;
  public score_box: any[] = [];
  public gameDetailsBs = new BehaviorSubject<any>(0);
  public quizData: any[]=[];
  constructor(
    private _appService: ApplicationService,
    private db: AngularFireDatabase,
    private store : AngularFirestore,
    private _router : Router,
  ) {
    //this.itemsRef = db.list('quizset', (ref) => ref);
    // this.items = this.itemsRef
    //   .snapshotChanges()
    //   .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      
    // this.items.subscribe((g:any)=>{
    //   console.log("llpp",g);
    // })

      // this.store.getAll().snapshotChanges().pipe(
      //   map(changes =>
      //     changes.map(c =>
      //       ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      //     )
      //   )
      // ).subscribe(data => {
      //   this.tutorials = data;
      // });
    //this.itemsRef = db.list('quizdata', (ref) => ref);


    // this.mmk = this.store.collection("quizset").snapshotChanges() as Observable<any>;
    // this.mmk.pipe(
    //   map((r:any)=>{
    //     r.map((x:any)=>{
    //       console.log("dx",x);
    //     })
    //   })
    // )

   // const citiesRef = collection(this.store, "quizset");

    // let nmj = this.store.collection("quizset").snapshotChanges() as Observable<any>;
    // this.mmk.subscribe((dx:any) => {
    //   console.log("dx",dx);
    // })

  
    // this.itemsRef
    // .snapshotChanges().subscribe((k:any)=>{
    //   console.log("kkk",k);
    // })
    this.fetch_quizset();
  }


  fetch_quizset(category?:number) {
    this.quizData=[];
    //if(category){
      this.store.collection("quizset").get()
        .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let q : any = doc.data();
            if(category){
              if(q?.category == category) {
                console.log("DOC",q);
                this.quizData.push(q);
              }
            } else {
              this.quizData.push(q);
            }
        });
      });
    // } else {
    //   this.store.collection("quizset").get().subscribe((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         let q = doc.data();
    //         this.quizData.push(q);
    //     });
    //   });
    // }
  }

  round_increment(): number {
    this.round_num = this.round_num + 1;
    return this.round_num;
  }

  update_round(gameStatus?:string):any {
    if(gameStatus == 'restart') {
      this.game_score = 0;
      this.round_num = 0;
      let game = {'round': 0};
      sessionStorage.setItem('game', JSON.stringify(game));
    } else if(gameStatus == 'end') {
      // let quiz_data : any[]=[];
      // this.items.subscribe((e: any) => {
      //   if(e?.q != undefined){
      //   quiz_data.push(e?.q);}
      // });
      // this.game_score = 0;
      // this.round_num = 1;
      // let game = {'round': 1};
      // sessionStorage.setItem('game', JSON.stringify(game));
    }
    var game_details = {
      score: this.game_score,
      round: this.round_num,
      gameStatus: ''
    };
    if(gameStatus == 'restart' || gameStatus == 'end') {
      game_details.gameStatus = gameStatus;
    }
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

  retry() {
    sessionStorage.removeItem(`user_score`);
    sessionStorage.removeItem(`user_game_progress`);
    this.items.asObservable();
    this.fetch_quizset();
    this.update_round('restart');
    this._router.navigate([`../application/quizround`]);
  }

  newGame(){
    sessionStorage.removeItem(`user_score`);
    sessionStorage.removeItem(`user_game_progress`);
    this.items.asObservable();
    this.fetch_quizset();
    this.update_round('restart');
    sessionStorage.removeItem('gameMode');
    this._router.navigate([`../application/intro`]);
  }

  giveUp() {
    sessionStorage.removeItem(`user_score`);
    sessionStorage.removeItem(`user_game_progress`);
    this.update_round('end');
    this._router.navigate([`../application/quizround`]);
  }
}
