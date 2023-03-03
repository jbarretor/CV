import { Component, OnInit } from '@angular/core';

declare let particlesJS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portafolio';

  constructor() {}

  ngOnInit(): void {
    particlesJS('particles-js', null, null);
  }
}
