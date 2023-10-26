import { Component, OnInit } from '@angular/core';
import { SlotResponse } from './models/slotResponse.model';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SlotRequest } from './models/slotRequest.model';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'schiaviDelPadel';

  public currentDate = new Date();
  public currentDateTimeString = this.currentDate
    .toLocaleDateString()
    .replace(',', '');

  public daysOfWeek = []
  public slots?: SlotResponse[];

  constructor(http: HttpClient, private data: DataService) {
    http
      .get<SlotResponse[]>(
        `https://localhost:7077/Slot/ByDate?date=${this.currentDateTimeString}`
      )
      .subscribe((result) => {
        this.slots = result;
        this.buildTimeSpans(this.slots);
        console.log(this.currentDateTimeString)
      });
  }

  timeSpans = [
    { time: `${this.currentDateTimeString}` + ' 08:30:00', user: '' },
    { time: `${this.currentDateTimeString}` + ' 10:00:00', user: '' },
    { time: `${this.currentDateTimeString}` + ' 11:30:00', user: '' },
    { time: `${this.currentDateTimeString}` + ' 13:00:00', user: '' },
    { time: `${this.currentDateTimeString}` + ' 14:30:00', user: '' },
    { time: `${this.currentDateTimeString}` + ' 16:00:00', user: '' },
    { time: `${this.currentDateTimeString}` + ' 17:30:00', user: '' },
    { time: `${this.currentDateTimeString}` + ' 19:00:00', user: '' },
    { time: `${this.currentDateTimeString}` + ' 20:30:00', user: '' },
    { time: `${this.currentDateTimeString}` + ' 22:00:00', user: '' },
  ];

  buildTimeSpans(slots: any): void {
    for (let timeSpan of this.timeSpans) {
      for (let slot of slots) {
        if (timeSpan.time == slot.dateTime) {
          timeSpan.user = slot.userName;
        }
      }
    }
    console.log(this.timeSpans)
    console.log(slots)
  }

  reserveSlot(time: string): void{
    console.log(time)
    
    let addTime = {
      UserId: 2,
      DateTime: time.replace('/','-').replace('/','-')
    }

    this.data.addSlot('https://localhost:7077/Slot',addTime).subscribe(data=>{console.log(data)})

  }
}
