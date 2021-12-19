import { Component, OnInit } from '@angular/core';
// import { UserscoreService } from './userscore.service';

import { UserScore } from '../shared/user-score';
import { ApplicationService } from '../application.service';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-userscore',
  templateUrl: './userscore.component.html',
  styleUrls: ['./userscore.component.scss'],
})
export class UserscoreComponent implements OnInit {
  //public items: any[] = [];

  //constructor(private _userScore: UserscoreService) {}

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(
    private db: AngularFireDatabase,
    private _appService: ApplicationService
  ) {
    this.itemsRef = db.list(
      'scores',
      (ref) => (ref.orderByChild('points'), ref.limitToLast(4))
    );
    // db.list('/items', (ref) => ref.orderByChild('size').equalTo('large'));
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );

    //console.log('this.items', this.items);
  }

  ngOnInit(): void {
    this.items.subscribe((f) => {
      console.log('this.items', f);
    });
  }

  addUserScore(userScore: number) {
    let user = localStorage.getItem('user');
    let userthis = JSON.parse(user ? user : '');
    this.itemsRef.push({ email: userthis.email, points: userScore });
  }
  updateItem(key: string, user_score: number) {
    let user = localStorage.getItem('user');
    let userthis = JSON.parse(user ? user : '');
    this.itemsRef.update(key, { email: userthis.email, points: user_score });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
}
