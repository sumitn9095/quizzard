import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { of, from, timer, fromEvent, interval, Observable, Subscription} from 'rxjs';
import { skipWhile, skipUntil, takeWhile, map, take, takeUntil, concatMap, tap, exhaustMap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit, AfterViewInit {
  public counter1:number = 0;
  public counter2: string[]=[];
  public counter2Num: number = 0;
  public obs = new Observable();
  public exp3 : any;
  constructor() { }
  @ViewChild('btn_cntr1') 'btn_cntr1' : ElementRef;
  @ViewChild('btn_cntr2') 'btn_cntr2' : ElementRef;
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    // example 1 - counter
    let v1 = fromEvent(this.btn_cntr1.nativeElement, 'click');
    v1.subscribe((g:any) => {
      timer(0,1200)
      .pipe(
        map((r:any) => r),
        takeWhile((a) => a < 5)
        //skipWhile((a) => a < 5)
      )
      .subscribe((v:any)=> {
        this.counter1 = v;
        //console.log("v----",v);
      })
    });


    // example 2 - 
    fromEvent(this.btn_cntr2.nativeElement, 'click').subscribe(f => {
      var v2 = from(['aa','bb','cc']);
     
     
      v2.pipe(
        // -- concatMap
        exhaustMap(f => interval(700).pipe(
            take(2),
            tap(r => console.log(r,f))
          )
        )
      ).subscribe()


      
        

      // var vf = interval(1000);
      // vf.pipe(
      //   takeWhile((r,q) => q < 4)
        
      // )
      // .subscribe(t => {
      //   this.counter2Num = t;
      // })


      // v2
      // .pipe(
        
      // )
      // .subscribe(d => {
      //   this.counter2.push(d);
      // });
    })


    // --  exhaustMap
    let jk = from(['dd','tt','jj']);
    interval(700).pipe(
      takeWhile(g => g < 3),
      switchMap(d => of(jk).pipe(
        ///tap((f)=>console.log(f))
      ))
    ).subscribe(u => {
      console.log("----",u);
    })
  }
}
