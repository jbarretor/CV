import { Component, Input, OnInit } from '@angular/core';
import { SocialNetwork } from 'src/app/interfaces/social-network';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  
  @Input()
  socialNetwork: SocialNetwork

  constructor(private portafolioService: PortafolioService) {
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