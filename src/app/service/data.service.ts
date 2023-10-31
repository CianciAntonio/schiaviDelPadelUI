import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SlotResponse } from '../models/slotResponse.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  
  addSlot(url: string, body: {}){
    return this.http.post(url, body)
  }

  getSlotsofTheDay(url: string, currentDateTimeString: string){
    return this.http.get<SlotResponse[]>(`${url}?date=${currentDateTimeString}`)
  }
}
