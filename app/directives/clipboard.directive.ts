/// <reference path="clipboard.d.ts" />
// From: http://stackoverflow.com/questions/36328159/how-do-i-copy-to-clipboard-in-angular-2-typescript

import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import Clipboard = require('clipboard');

@Directive({
  selector: '[clipboard]'
})
export class ClipboardDirective {
  clipboard: Clipboard;

  @Input('clipboard')
  elt: Element;

  @Output()
  clipboardSuccess: EventEmitter<any> = new EventEmitter();

  @Output()
  clipboardError: EventEmitter<any> = new EventEmitter();

  constructor(private eltRef: ElementRef) {
  }

  ngOnInit(): void {
    this.clipboard = new Clipboard(this.eltRef.nativeElement, {
      target: () => {
        return this.elt;
      }
    });

    this.clipboard.on('success', (e: any) => {
      this.clipboardSuccess.emit();
    });

    this.clipboard.on('error', (e: any) => {
      this.clipboardError.emit();
    });
  }

  ngOnDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
}
