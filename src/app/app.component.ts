import { Component, OnInit } from '@angular/core';
import { ParticlesConfig } from './particles-config';

declare let particlesJS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  year: string

  constructor (){
    let date: Date = new Date()
    this.year = date.getFullYear().toString()
  }



  public ngOnInit(): void {
    this.invokeParticles();
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
}
