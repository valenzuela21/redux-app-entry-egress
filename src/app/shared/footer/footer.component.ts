import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  date: number;

  constructor() {
    let date = new Date();
    this.date = date.getFullYear();
  }

  ngOnInit(): void {
  }

}
