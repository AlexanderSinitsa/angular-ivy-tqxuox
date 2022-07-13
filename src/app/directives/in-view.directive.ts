import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { InViewService } from '../services/in-view.service';


@Directive({
  selector: '[inView]'
})
export class InViewDirective implements AfterViewInit, OnDestroy {
  @Output() inViewStatusChanged = new EventEmitter<boolean>();

  private destroyed$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private inViewService: InViewService,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inViewService.registerTarget(this.elementRef.nativeElement);
      this.inViewService.trigger$.pipe(
        takeUntil(this.destroyed$),
        filter((entry) => entry && entry.target === this.elementRef.nativeElement)
      )
        .subscribe((entry): void => {
          const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

          if (isVisible) {
            this.inViewStatusChanged.emit(isVisible)
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
