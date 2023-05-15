import { Component, Input, OnInit } from '@angular/core';
import { SocialNetwork } from '@interface/social-network';

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
      hide: true,
      detail: []
    }
  }

  ngOnInit(): void {
    
  }
}