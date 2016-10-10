import {Directive, ElementRef, Renderer} from "@angular/core";

@Directive({
    selector: '[highlight]'
})
export class HighlightDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
        // this.elementRef.nativeElement.style.backgroundColor = 'yellow';
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'background-color', '#eee');
    }


}
