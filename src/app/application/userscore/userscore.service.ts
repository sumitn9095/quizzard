import { Injectable } from '@angular/core';
import { UserScore } from '../shared/user-score';
import { ApplicationService } from '../application.service';

// import {
//   AngularFireDatabase,
//   AngularFireList,
// } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserscoreService {
  // itemsRef: AngularFireList<any>;
  // items: Observable<any[]>;
  constructor(
    private firestore: AngularFirestore,
    //private db: AngularFireDatabase,
    private _appService: ApplicationService
  ) {
    // this.itemsRef = db.list('scores', (ref) =>
    //   ref.orderByChild('points').limitToLast(10)
    // );
    // this.items = this.itemsRef
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) =>
    //       changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
    //     )
    //   );
    //console.log('this.items', this.items);
  }

  add_user_score() {
    let ssd = this._appService.fetch_user_score_details();
    // this.addUserScore(
    //   ssd.user.email,
    //   JSON.parse(ssd.user_score ? ssd.user_score : '')
    // );

    let user_score_data = {
      email: ssd.user.email,
      user_score: JSON.parse(ssd.user_score ? ssd.user_score : ''),
    };

    this.fs_add_score(user_score_data);
  }

  // addUserScore(email: string, user_score: number) {
  //   this.itemsRef.push({ email: email, points: user_score });
  // }

  fs_add_score(data: any) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('scorelist')
        .doc(data.email)
        .set(data)
        .then(
          (res) => {
            console.log(`score added in scorelist`);
          },
          (err) => {
            console.error(
              `ERROR : score cannot be added in scorelist, due to some problems`
            );
          }
        );
    });
  }

  fs_get_score() {
    return this.firestore
      .collection('scorelist')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      );
  }
}
