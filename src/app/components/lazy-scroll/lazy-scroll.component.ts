import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { BoxStateEnum } from '../../enums/box-state.enum';


@Component({
  selector: 'my-lazy-scroll',
  templateUrl: './lazy-scroll.component.html'
})
export class LazyScrollComponent {
  @Input() items = [];
  @Input() itemsVisibilityState: { [key: number]: BoxStateEnum } = {};
  // @Input() isItemReadyFn: (item: any) => boolean;
  @Input() itemHeight = 200;

  @Output() scrolledToItem = new EventEmitter<number>()

  @ContentChild('templateRef') templateRef: TemplateRef<any>;

  BoxStateEnum = BoxStateEnum;


  onInViewStatusChanged(i: number) {
    this.scrolledToItem.emit(i)
  }

}
