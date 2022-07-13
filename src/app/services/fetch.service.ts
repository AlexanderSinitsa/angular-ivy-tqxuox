import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FetchService {

  public fetch(id: number) {
    console.log('Fetch request with id', id);
    const delay = Math.random() * 5000;

    return new Promise<string>((resolve) =>
      setTimeout(
        () =>
          resolve(`Value from server (delay: ${(delay / 1000).toFixed(2)})`),
        delay
      )
    );
  }
}
