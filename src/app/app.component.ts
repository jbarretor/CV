import { Component, OnInit } from '@angular/core';
import { ParticlesConfig } from './particles-config';

declare let particlesJS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  protected year: string

  constructor (){
    let date: Date = new Date()
    this.year = date.getFullYear().toString()
  }



  ngOnInit(): void {
    this.invokeParticles();
  }

  private invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
}
