import { Component, OnInit } from '@angular/core';
import { SlotResponse } from './models/slotResponse.model';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'schiaviDelPadel';

  public currentDate = new Date();
  public currentDateTimeString = this.currentDate.toLocaleString().replace(',','');
  public currentDateMidNight = this.currentDate.toDateString();

  public slots?: SlotResponse[];

  constructor(http: HttpClient){
    http.get<SlotResponse[]>(`https://localhost:7077/Slot/ByDate?date=${this.currentDateTimeString}`).subscribe(
      result=>{
        this.slots = result;
      }
    )
  }

  timeSpans = [
    {time : `${this.currentDateMidNight}`+' 08:30', user : ''},
    {time : `${this.currentDateMidNight}`+' 10:00', user : ''},
    {time : `${this.currentDateMidNight}`+' 11:30', user : ''},
    {time : `${this.currentDateMidNight}`+' 13:00', user : ''},
    {time : `${this.currentDateMidNight}`+' 14:30', user : ''},
    {time : `${this.currentDateMidNight}`+' 16:00', user : ''},
    {time : `${this.currentDateMidNight}`+' 17:30', user : ''},
    {time : `${this.currentDateMidNight}`+' 19:00', user : ''},
    {time : `${this.currentDateMidNight}`+' 20:30', user : ''},
    {time : `${this.currentDateMidNight}`+' 22:00', user : ''}
  ]

  ngOnInit(): void {    
      // for(let timeSpan of this.timeSpans){
      //   for(let slot of this.slots!){
      //     if(timeSpan.time == slot.dateTime){
      //       timeSpan.user = slot.userName
      //     }
      //   }
      // }
  }
}
