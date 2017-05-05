import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'myresume-directory-list',
  moduleId: module.id,
  templateUrl: 'directory-list.component.html'
})
export class DirectoryListComponent {
  fileContents: string;
  messages: any = {
    success: '',
    error: '',
  };

  onFileContent(content: string): void {
    this.fileContents = content;
  }

  onClipSuccess(): void {
    this.messages = {
      success: 'Content was copied successfully!',
      error: ''
    };
    this.resetMessages();
  }

  onClipError(): void {
    this.messages = {
      success: '',
      error: 'Content could not be copied.'
    };
    this.resetMessages();
  }

  resetMessages(): void {
    let timer = Observable.timer(5000);
    timer.subscribe(() => this.messages = {
      success: '',
      error: ''
    });
  }
}
