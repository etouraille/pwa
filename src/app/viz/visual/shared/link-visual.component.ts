import { Component, Input } from '@angular/core';
import { Link } from './../../d3/model';

@Component({
    selector: '[linkVisual]',
    template: `
    <svg:line
        [style]="link.style"
        [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y"
    ></svg:line>
  `
})
export class LinkVisualComponent  {
    @Input('linkVisual') link: Link;
}
