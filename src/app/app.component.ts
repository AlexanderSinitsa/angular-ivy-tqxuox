import { Component } from '@angular/core';

import { BoxStateEnum } from './enums/box-state.enum';
import { FetchService } from './services/fetch.service';


interface BoxInterface {
  id: number;
  text?: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  BoxStateEnum = BoxStateEnum;
  boxes: BoxInterface[] = Array(10).fill({});

  // my-lazy-scroll component requires some trigger when an item is loaded,
  // so use boxesVisibilityState or isItemReadyFn or ...
  boxesVisibilityState: { [key: number]: BoxStateEnum; } = {};
  // isItemReadyFn = (item: BoxInterface) =>  item.text !== null;

  constructor(private fetchService: FetchService) {
    this.init();
  }

  private init() {
    this.boxes.forEach((item, i) => {
      this.boxes[i] = {
        id: i,
        text: null
      }
      this.boxesVisibilityState[i] = BoxStateEnum.Empty;
    })
  }

  async fetchBoxContent(index: number) {
    if (this.boxesVisibilityState[index] === BoxStateEnum.Empty) {
      this.boxesVisibilityState[index] = BoxStateEnum.Loading;

      // consider to use observer if you want to cancel some requests on fast scroll
      const boxContent = await this.fetchService.fetch(index)
        .catch(err => {
          console.error(err);
          return 'Something went wrong!';
        });

      this.updateBoxContent(index, String(boxContent));
    }
  }

  private updateBoxContent(index: number, content: string) {
    if (this.boxes[index]?.id || this.boxes[index]?.id === 0) {
      this.boxes[index].text = content;
      this.boxesVisibilityState[index] = BoxStateEnum.Ready;
    }
  }

}
