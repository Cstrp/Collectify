import { Component, Input } from '@angular/core';
import { Collection } from '../../interfaces';

@Component({
  selector: 'app-collection-list-item',
  templateUrl: './collection-list-item.component.html',
})
export class CollectionListItemComponent {
  @Input() collection!: Collection;

  public capitalizeTitle() {
    return (
      this.collection.title.charAt(0).toUpperCase() +
      this.collection.title.slice(1)
    );
  }
}
