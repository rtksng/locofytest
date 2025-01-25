import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  showDashboardScreen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
}
