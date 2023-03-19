import { Injectable } from '@angular/core';
import { STORAGE } from '../helpers/enums';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() { }

  get(key: STORAGE) {
    return localStorage.getItem(key);
  }

  setAsJSON(key: STORAGE, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getAsJSON(key: STORAGE) {
    return JSON.parse(this.get(key) || '[]');
  }

  pushToArray(key: STORAGE, element: unknown) {
    const arr = this.getAsJSON(key) || [];
    this.setAsJSON(key, [element, ...arr]);
  }
}