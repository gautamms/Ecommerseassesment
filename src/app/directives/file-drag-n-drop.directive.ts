import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[fileDragDrop]'
})

export class FileDragNDropDirective {
  //@Input() private allowed_extensions : Array<string> = ['png', 'jpg', 'bmp'];
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  //@Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#FFFFFF';
  @HostBinding('style.border') private borderStyle = '2px dashed';
  @HostBinding('style.border-color') private borderColor = '#003978';
  @HostBinding('style.border-radius') private borderRadius = '5px';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFFFFF';
    this.borderColor = '#003978';
    this.borderStyle = '3px solid';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFFFFF';
    this.borderColor = '#003978';
    this.borderStyle = '2px dashed';
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFFFFF';
    this.borderColor = '#003978';
    this.borderStyle = '2px dashed';
    debugger;
    let files = evt.dataTransfer.files;
    let valid_files : Array<File> = files;
    this.filesChangeEmiter.emit(valid_files);
  }
}