import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, Injectable } from '@angular/core';

import { DirectoryEntry, DirectoryEntryType } from '../../domain/directory/directory-entry';
import { DirectoryService } from '../../services/directory.service';

@Injectable()
export class AllItemsModelService {
  private allItems: DirectoryEntry[];

  constructor() {
    this.allItems = new Array<DirectoryEntry>();
  }

  public get AllItems(): DirectoryEntry[] {
    return this.allItems;
  }

  public addItems(dirs: DirectoryEntry[]) {
    this.allItems = this.allItems.concat(dirs);
  }

  public removeItems(dirs: DirectoryEntry[]) {
    let newList = new Array<DirectoryEntry>();
    for (let li of this.allItems) {
      let remove = false;
      for (let d of dirs) {
        if (li === d) {
          remove = true;
          break;
        }
      }

      if (!remove) {
        newList.push(li);
      }
    }

    this.allItems = newList;
  }

  public unselectListItems(itemExcepted: DirectoryEntry) {
    for (let li of this.allItems) {
      if (li !== itemExcepted) {
        li.IsActive = false;
      }
    }
  }
}

@Component({
  selector: 'myresume-file-browser',
  moduleId: module.id,
  templateUrl: 'file-browser.component.html'
})
export class FileBrowserComponent implements OnInit, OnDestroy {
  @Input() parentId?: number;
  @Output() onFileContent: EventEmitter<any> = new EventEmitter();
  isLoading: boolean;
  list: DirectoryEntry[];

  constructor(
    private service: DirectoryService,
    private allItems: AllItemsModelService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.service.list(this.parentId).then((dirs) => {
      this.list = dirs;
      this.allItems.addItems(this.list);
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.allItems.removeItems(this.list);
  }

  internalOnFileContent(content: string) {
    this.onFileContent.emit(content);
  }

  processItem(li: DirectoryEntry, $event: Event): void {
    if (li.TypeId == DirectoryEntryType.Folder) {
      li.IsExpanded = !li.IsExpanded;
      this.onFileContent.emit('');
    }
    else {
      this.service.content(li.Id).then((content) => {
        this.onFileContent.emit(content);
      })
    }

    li.IsActive = true;
    this.allItems.unselectListItems(li);
    $event.stopPropagation();
  }

  getItemClass(li: DirectoryEntry): string {
    let classNames = new Array<string>();
    if (li.IsActive) {
      classNames.push('active');
    }

    if (li.TypeId == DirectoryEntryType.Folder) {
      if (li.IsExpanded) {
        classNames.push('folder-open');
      }
      else {
        classNames.push('folder-closed');
      }
    }
    else {
      classNames.push('file');
    }

    return classNames.join(' ');
  }
}
