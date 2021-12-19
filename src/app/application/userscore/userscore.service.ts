import { Injectable } from '@angular/core';

import { UserScore } from '../shared/user-score';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserscoreService {
  public userStatus: AngularFireObject<any> | undefined;
  public topTenUsersScore: AngularFireList<any> | undefined;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('score');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  addUserScore(userScore: UserScore) {
    this.itemsRef.push({ email: userScore });
  }
  updateItem(key: string, user_score: number) {
    this.itemsRef.update(key, { email: user_score });
  }
}
