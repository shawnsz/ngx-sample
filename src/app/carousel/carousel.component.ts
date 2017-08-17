import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, Subscription } from 'rxjs/Rx';
// import { Http } from '@angular/http';

@Component({
  selector: 'urtk-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('slideMoveforward', [
      state('right', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      state('middle', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('left', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      state('inactive', style({

      })),
      transition('inactive => right', animate('')),
      transition('inactive => left', animate('')),
      transition('right => middle', animate('800ms ease-in-out')),
      transition('middle => left', animate('800ms ease-in-out')),
      transition('left => middle', animate('800ms ease-in-out')),
      transition('middle => right', animate('800ms ease-in-out'))
    ])
  ]

})
export class CarouselComponent implements OnInit, OnDestroy {
  private interval: number;         // slide switch in interval/2 seconds.
  private wrap: boolean;
  private keyboard: boolean;
  private ticks: number;

  private timer: any;
  // Subscription object
  private subscpt: Subscription;

  // public StsBgImg: string;
  public IsPlatformBr: boolean;

  public Slides: any[];
  public IdxActive: number;
  public IdxNew: number;
  public Sliding: boolean;
  public Action: string;
  public Pause: boolean;
  public ActStep: number;

  // constructor(private http:Http) {
  constructor( @Inject(PLATFORM_ID) private platformId: Object) {
    this.interval = 16;         // slide switch in interval/2 seconds.
    this.wrap = true;
    this.keyboard = true;
    this.ticks = 0;

    this.Slides = [];
    this.IdxActive = 0;
    this.IdxNew = -1;
    this.Sliding = false;
    this.Action = '';
    this.Pause = false;
    this.ActStep = 0;

    if (isPlatformBrowser(this.platformId)) {
      this.IsPlatformBr = true;
    } else if (isPlatformServer(this.platformId)) {
      this.IsPlatformBr = false;
    }

    this.Slides.push({
      imgClass: `bg-slide-01`,
      title1: `We Build Electronics`,
      textInfo1: `All Kinds, All shapes, All sizes.`,
      // title2: `All Kinds, All shapes, All sizes`,
      ForwardState: 'middle',
      active: 'active'
    });
    this.Slides.push({
      imgClass: `bg-slide-02`,
      title1: `Customized Design Solutions`,
      textInfo1: `Seamlessly Transitioning Proto to Production.`,
      ForwardState: 'inactive',
      active: ''
    });
    this.Slides.push({
      imgClass: `bg-slide-03`,
      title1: `Building Relationships`,
      textInfo1: `Focused on Exceeding Expectations in Quality, Service & Delivery.`,
      ForwardState: 'inactive',
      active: ''
    });
    this.Slides.push({
      imgClass: `bg-slide-04`,
      title1: `We are Expanding`,
      textInfo1: `Urtech Expands Footprint into the United States.`,
      ForwardState: 'inactive',
      active: ''
    });
    this.Slides.push({
      imgClass: `bg-slide-05`,
      title1: `Supply Chain Management`,
      textInfo1: `Meet Requirement, Reduce Cost, Maintain Quality & Deliver on Time.`,
      ForwardState: 'inactive',
      active: ''
    });
    this.Slides.push({
      imgClass: `bg-slide-06`,
      title1: `UrStart - Hardware Accelerator`,
      textInfo1: 'Enables Canadian Hardware Start-ups to Launch Their Products.',
      ForwardState: 'inactive',
      active: ''
    });

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.timer = Observable.timer(1000, 500);
      this.subscpt = this.timer.subscribe(t => {
        this.processTick(t);
      });
    }
  }

  ngOnDestroy() {
    if (this.subscpt) this.subscpt.unsubscribe();
  }

  processTick(t: number) {
    // console.log(t);
    this.ticks = t;
    let tmpTicks = this.ticks % this.interval;
    if (tmpTicks === 0 && !this.Pause) {
      // console.log('timer:'+t);
      if (!this.Sliding) {
        // console.log('ready:'+t);
        this.PrepNext();
      }
    }

  }

  onMouseOver() {
    // console.log('in');
    this.Pause = true;
  }

  onMouseOut() {
    // console.log('out');
    this.Pause = false;
  }

  slideNext() {
    // this.cancelAct();
    // console.log('go' + this.Sliding);
    if (!this.Sliding) { this.PrepNext(); }
  }

  slidePrev() {
    // this.cancelAct();
    if (!this.Sliding) { this.PrepPrev(); }
  }

  slideTo(pIdx: number) {
    if (!this.Sliding) { this.PrepMoveTo(pIdx); }
  }

  cancelAct() {
    if (this.Sliding === true) {
      let activeEle = this.Slides[this.IdxActive];
      let newEle = this.Slides[this.IdxNew];
      if (activeEle && newEle) {
        if (this.ActStep > 20) {
          activeEle.active = '';
          activeEle.ForwardState = 'inactive';
          this.IdxActive = this.IdxNew;
          this.IdxNew = -1;
          this.ActStep = 0;
          this.Sliding = false;
        } else {
          this.ActStep = 0;
          this.Action = '';
          newEle.ForwardState = 'inactive';
          newEle.active = '';
          activeEle.ForwardState = 'middle';
          this.Sliding = false;
        }
      }

    }
  }

  animationDone(eveEle) {
    // console.log('animationDone');
    if (eveEle.fromState === 'middle' && eveEle.toState === 'left') {
      let activeEle = this.Slides[this.IdxActive];
      if (activeEle) {
        activeEle.active = '';
        activeEle.ForwardState = 'inactive';
        this.IdxActive = this.IdxNew;
        this.IdxNew = -1;
        this.ActStep = 0;
        this.Sliding = false;
      }
    } else if (eveEle.fromState === 'right' && eveEle.toState === 'middle') {
      this.Sliding = false;
    } else if (eveEle.fromState === 'inactive' && eveEle.toState === 'right' && this.Action === 'next') {
      this.MoveNext();
    } else if (eveEle.fromState === 'middle' && eveEle.toState === 'right') {
      let activeEle = this.Slides[this.IdxActive];
      if (activeEle) {
        activeEle.active = '';
        activeEle.ForwardState = 'inactive';
        this.IdxActive = this.IdxNew;
        this.IdxNew = -1;
        this.ActStep = 0;
        this.Sliding = false;
      }
    } else if (eveEle.fromState === 'left' && eveEle.toState === 'middle') {
      this.Sliding = false;
    } else if (eveEle.fromState === 'inactive' && eveEle.toState === 'left' && this.Action === 'prev') {
      this.MovePrev();
    }

  }

  getNewIdx(pIdx: number) {
    if (pIdx >= 0) {
      if (pIdx >= this.Slides.length) {
        this.IdxNew = 0;
      } else {
        this.IdxNew = pIdx;
      }
    } else {
      this.IdxNew = 0;
    }
  }

  getNextIdx() {
    this.IdxNew = this.IdxActive + 1;
    if (this.IdxNew >= this.Slides.length) { this.IdxNew = 0; }
    // console.log(this.IdxNew);
  }

  getPrevIdx() {
    this.IdxNew = this.IdxActive - 1;
    if (this.IdxNew < 0) { this.IdxNew = this.Slides.length - 1; }
    // console.log(this.IdxNew);
  }

  PrepPrev() {
    this.getPrevIdx();
    let newEle = this.Slides[this.IdxNew];
    if (newEle) {
      this.ActStep = 11;
      this.Action = 'prev';
      this.Sliding = true;
      newEle.ForwardState = 'left';
      newEle.active = 'active';
    }
  }

  PrepNext() {
    this.getNextIdx();
    // console.log(this.IdxNew);
    let newEle = this.Slides[this.IdxNew];
    if (newEle) {
      this.ActStep = 12;
      this.Action = 'next';
      this.Sliding = true;
      newEle.ForwardState = 'right';
      newEle.active = 'active';
      // console.log('PrepNext:done');
    }
  }

  PrepMoveTo(pIdx: number) {
    this.getNewIdx(pIdx);
    if (this.IdxNew === this.IdxActive) {
      this.IdxNew = -1;
      return;
    }
    let newEle = this.Slides[this.IdxNew];
    if (newEle) {
      this.ActStep = 12;
      this.Sliding = true;
      if (this.IdxNew > this.IdxActive) {
        this.Action = 'next';
        newEle.ForwardState = 'right';
      } else {
        this.Action = 'prev';
        newEle.ForwardState = 'left';
      }
      newEle.active = 'active';
    }
  }

  MoveNext() {
    let activeEle = this.Slides[this.IdxActive];
    let newEle = this.Slides[this.IdxNew];
    if (activeEle && newEle) {
      this.ActStep = 21;
      activeEle.ForwardState = 'left';
      newEle.ForwardState = 'middle';
    }
  }

  MovePrev() {
    let activeEle = this.Slides[this.IdxActive];
    let newEle = this.Slides[this.IdxNew];
    if (activeEle && newEle) {
      this.ActStep = 22;
      activeEle.ForwardState = 'right';
      newEle.ForwardState = 'middle';
    }
  }

  getActiveSlide() {
    let tmpEle = this.Slides.filter(x => x.active)[0];
    // console.info(tmpEle);
    return tmpEle;
  }

  getSlideByIndex(pIdx: number) {
    let tmpEle = this.Slides.filter(x => x.idx === pIdx)[0];
    // console.info(tmpEle);
    return tmpEle;
  }


  // onScroll(event){
  //   var tmpScrollTop = event.target.scrollingElement.scrollTop;
  //   console.log('height:'+event.target.scrollingElement.scrollTop);
  //   if(tmpScrollTop>200){
  //     this.StsBgImg = 'img-up';
  //   }
  //   else{
  //     this.StsBgImg = 'img-down';
  //   }
  // }


}
