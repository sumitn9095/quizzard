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

  read_key(key: string) {
    let score = localStorage.getItem(key);
    return score !== null ? JSON.parse(score) : '';
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
