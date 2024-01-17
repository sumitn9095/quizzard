import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-quizset',
  templateUrl: './quizset.component.html',
  styleUrls: ['./quizset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizsetComponent implements OnInit {
  @Input() quizData: any;
  @Output() public ev = new EventEmitter<any>();
  constructor() {}
  ngOnInit(): void {
    console.log("quizData",this.quizData);
  }
  optionChosen(evt:any){
    this.ev.emit(evt);
  }
}
