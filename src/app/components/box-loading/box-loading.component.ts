import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';


@Component({
  selector: 'my-box-loading',
  templateUrl: './box-loading.component.html'
})
export class BoxLoadingComponent {
  @Input() box: any;
  @Input() isContentReady = false;
  @Input() reservedWidth = 200;
  @Input() reservedHeight = 200;

  @Output() fetchRequired = new EventEmitter<void>()

  @ContentChild('boxTemplateRef') boxTemplateRef: TemplateRef<any>;
  @ContentChild('loadingTemplateRef') loadingTemplateRef: TemplateRef<any>;

  isBoxAppearedInView = false;

  onAppearedOnScreen() {
    if (this.isBoxAppearedInView === false) {
      this.isBoxAppearedInView = true;
      this.fetchRequired.emit();
    }
  }

}
