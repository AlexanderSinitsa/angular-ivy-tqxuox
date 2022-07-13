import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'box',
  template: `
    <h4>Box - {{text}}</h4>
  `
})
export class BoxComponent implements OnInit {
  @Input() text: string;
  @Input() id: number;

  ngOnInit() {
    console.log('Box component init', this.id);
  }
}
