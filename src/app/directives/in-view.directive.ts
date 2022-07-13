import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import { InViewService } from '../services/in-view.service';


@Directive({
  selector: '[inView]'
})
export class InViewDirective implements AfterViewInit, OnDestroy {
  @Output() appearedOnScreen = new EventEmitter<void>();

  private destroyed$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private inViewService: InViewService,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.inViewService.registerTarget(this.elementRef.nativeElement);
      this.inViewService.trigger$.pipe(
        takeUntil(this.destroyed$),
        filter((entry) => entry && entry.target === this.elementRef.nativeElement),
        // wait for scrolling
        debounceTime(100)
      )
        .subscribe((entry) => {
          const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

          if (isVisible) {
            this.appearedOnScreen.emit();
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();

    if (isPlatformBrowser(this.platformId)) {
      this.inViewService.unregisterTarget(this.elementRef.nativeElement);
    }
  }

}
