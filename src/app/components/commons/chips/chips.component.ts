import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent {
  @Input('chipList') tagList: string[];
  @Output() tag: string;
  @Output() showTagArticle = new EventEmitter();
  constructor() {}
  selectedChip: string = '';

  showTagByArticle(tag) {
    // this.tag = tag;
    this.showTagArticle.emit(tag);
    this.selectedChip = tag;
  }
}
