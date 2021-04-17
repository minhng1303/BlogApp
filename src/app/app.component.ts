import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FinalProject';
  constructor() {}

  myStyle: object = {};
    myParams: object = {};
    width: number = 150;
    height: number = 150;
 
    ngOnInit() {
        this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
        };
 
    this.myParams = {
            particles: {
                number: {
                    value: 250,
                },
                color: {
                    value:'#5851db',
                },
                shape: {
                    type: 'triangle',
                },
        }
    };
  }
}
