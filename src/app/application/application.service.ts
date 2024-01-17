import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  public quiz_round_num = 1;

  constructor() {}

  save_key(key: any, val: any) {
    sessionStorage.setItem(key, JSON.stringify(val));
  }

  read_key(key: any) {
    let score = sessionStorage.getItem(key);
    return score !== null ? JSON.parse(score) : 0;
  }

  fetch_user_score_details() {
    let user_score = sessionStorage.getItem('user_score');
    let user = sessionStorage.getItem('user');
    let userthis = JSON.parse(user ? user : '');
    return { user_score: user_score, user: userthis };
  }

  // s(name, user_data) {
  //   sessionStorage.setItem(`${name}`, JSON.stringify(user_data));
  // }

  // p(name) {
  //   return JSON.parse(sessionStorage.getItem(`${name}`));
  // }

  // r(item) {
  //   sessionStorage.removeItem(item);
  // }
}
