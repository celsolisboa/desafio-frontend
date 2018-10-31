import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchListService } from '../search-list.service';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {
  @Input() public list: any[];
  @Input() public selectedItems: any[];
  @Input() public prop: string;
  @Input() public placeholder: string;
  public foundItems: any[];

  @Output() updateSelection: EventEmitter<any[]> = new EventEmitter();

  constructor(private searchListService: SearchListService) { }

  ngOnInit() {
  }

  searchList(searchTerm: string): void {
    this.foundItems = this.searchListService.searchList(searchTerm, this.list, ['id', this.prop]);
  }

  inArray(item: any, list: any[]): boolean {
    if (!list || list.length === 0) return false;
    return list.some(i => i.id === item.id);
  }

  selectItem(id: string | number): void {
    this.selectedItems.push(this.list.find(item => item.id.toString() === id.toString()));
    this.updateSelection.emit(this.selectedItems);
  }

  unselectItem(id: string | number): void {
    this.selectedItems = this.selectedItems.filter(item => item.id.toString() !== id.toString());
    this.updateSelection.emit(this.selectedItems);
  }

  toggleTeacher(id: string | number): void {
    if (!this.selectedItems.some(item => item.id.toString() === id.toString())) {
      this.selectItem(id);
    } else {
      this.unselectItem(id);
    }
  }

}
