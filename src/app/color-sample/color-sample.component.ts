import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'color-sample',
    templateUrl: './color-sample.component.html',
    styleUrls: ['./color-sample.component.css']
})
export class ColorSampleComponent {
    text="Enter the color name"
    color:string

    colorChanged(input){
        this.color = input.value
    }

}
