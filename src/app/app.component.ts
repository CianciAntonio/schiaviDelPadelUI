import { Component, OnInit } from '@angular/core';
import { SlotResponse } from './models/slotResponse.model';
import { TimeSpan } from './models/timeSpan.model';
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

  currentDate: Date = new Date();
  public currentDateTimeString = this.currentDate
    .toLocaleDateString()
    .replace(',', '');

  public slots?: SlotResponse[];

  constructor(private data: DataService) {
      this.data.getSlotsofTheDay('https://localhost:7077/Slot/ByDate',this.currentDateTimeString)
      .subscribe((result) => {
        this.slots = result;
        console.log(this.slots)
        console.log(this.currentDate)
      });
  }

  reserveSlot(time: Date): void{
    
    let addTime = {
      UserId: 2,
      DateTime: time
    }

    this.data.addSlot('https://localhost:7077/Slot',addTime).subscribe(data=>{console.log(data)})

  }

  nextDay(){
    this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 1))
    this.currentDateTimeString = this.currentDate
      .toLocaleDateString()
      .replace(',', '');

    this.data.getSlotsofTheDay('https://localhost:7077/Slot/ByDate',this.currentDateTimeString)
      .subscribe((result) => {
        this.slots = result;
        console.log(this.slots)
      });
  }

  previousDay(){
    this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 1))
    this.currentDateTimeString = this.currentDate
    .toLocaleDateString()
    .replace(',', '');
    
    this.data.getSlotsofTheDay('https://localhost:7077/Slot/ByDate',this.currentDateTimeString)
      .subscribe((result) => {
        this.slots = result;
        console.log(this.slots)
      });
  }
}
