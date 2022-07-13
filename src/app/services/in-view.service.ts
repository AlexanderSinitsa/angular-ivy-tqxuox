import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class InViewService {
  private triggerSubject = new Subject<IntersectionObserverEntry>();
  public trigger$ = this.triggerSubject.asObservable()

  private targets = new Set<Element>();
  private intersectionObserver: IntersectionObserver;


  registerTarget(target: Element) {
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          if (entries?.length) {
            entries.forEach((entry) => this.triggerSubject.next(entry));
          }
        },
        { threshold: [0] }
      )
    }

    if (!this.targets.has(target)) {
      this.targets.add(target);
      this.intersectionObserver.observe(target);
    }
  }

  unregisterTarget(target: Element) {
    if (this.targets.has(target)) {
      this.intersectionObserver.unobserve(target);

      this.targets.delete(target);
    }
  }

}
