import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  public quiz_round_num = 1;

  constructor() {}

  save_key(key: any, val: any) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  read_key(key: any) {
    let score = localStorage.getItem(key);
    return score !== null ? JSON.parse(score) : 0;
  }

  fetch_user_score_details() {
    let user_score = localStorage.getItem('user_score');
    let user = localStorage.getItem('user');
    let userthis = JSON.parse(user ? user : '');
    return { user_score: user_score, user: userthis };
  }

  // s(name, user_data) {
  //   localStorage.setItem(`${name}`, JSON.stringify(user_data));
  // }

  // p(name) {
  //   return JSON.parse(localStorage.getItem(`${name}`));
  // }

  // r(item) {
  //   localStorage.removeItem(item);
  // }
}
