import { Component, Input, OnInit } from '@angular/core';
import { SocialNetwork } from 'src/app/interfaces/social-network';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  
  @Input()
  socialNetwork: SocialNetwork

  constructor() {
    this.socialNetwork = {
      id: '',
      key: '',
      title: '',
      detail: []
    }
  }

  ngOnInit(): void {
    
  }
}