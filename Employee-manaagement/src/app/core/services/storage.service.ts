import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: string) {
    if (localStorage.getItem(key) === null) {
      return null;
    } else {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
