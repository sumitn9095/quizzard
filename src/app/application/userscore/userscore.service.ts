import { Injectable } from '@angular/core';
import { UserScore } from '../shared/user-score';
import { ApplicationService } from '../application.service';

import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserscoreService {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(
    private db: AngularFireDatabase,
    private _appService: ApplicationService
  ) {
    this.itemsRef = db.list('scores', (ref) =>
      ref.orderByChild('points').limitToLast(10)
    );

    this.items = this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );

    //console.log('this.items', this.items);
  }

  fetch_user_score_details() {
    let user_score = localStorage.getItem('user_score');
    let user = localStorage.getItem('user');
    let userthis = JSON.parse(user ? user : '');
    return { user_score: user_score, email: userthis.email };
  }

  add_user_score() {
    let ssd = this.fetch_user_score_details();
    this.addUserScore(
      ssd.email,
      JSON.parse(ssd.user_score ? ssd.user_score : '')
    );
  }

  addUserScore(email: string, user_score: number) {
    this.itemsRef.push({ email: email, points: user_score });
  }
}
