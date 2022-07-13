import { Component } from '@angular/core';

import { FetchService } from './services/fetch.service';


interface BoxInterface {
  id?: number;
  text?: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  boxes: BoxInterface[] = Array(10).fill({});
  isContentReady: { [key: number]: true } = {};

  constructor(private fetchService: FetchService) {
    this.boxes.forEach((item, i) => {
      this.boxes[i] = { id: i }
    })
  }

  async fetchBoxContent(index: number) {
    if (!this.isContentReady[index]) {
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
    if (this.boxes[index]) {
      this.boxes[index].text = content;
    }

    this.isContentReady[index] = true;
  }

}
