import { Component, OnInit } from '@angular/core';
import { SocialNetwork } from 'src/app/interfaces/social-network';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  socialNetworkAll: Array<SocialNetwork>
  socialNetwork: SocialNetwork
  lang: string = 'en'

  constructor(private portafolioService: PortafolioService) {
    this.socialNetworkAll = []
    this.socialNetwork = {
      id: '',
      key: '',
      title: '',
      detail: []
    }
  }

  ngOnInit(): void {
    this.loadData()
  }

  changeLang(lang: string) {
    this.lang = lang
    this.loadData()
  }

  loadData() {
    if (this.socialNetworkAll.length > 0) {
      let info = this.socialNetworkAll.find(x => x.key == this.lang)
      if (info) {
        this.socialNetwork = info
      } else {
        this.socialNetwork = {
          id: '',
          key: '',
          title: '',
          detail: []
        }
      }
    } else {
      this.portafolioService.readSocialNetwork().subscribe(socialNetwork => {
        this.socialNetworkAll = socialNetwork
        let info = socialNetwork.find(x => x.key == this.lang)
        if (info) {
          this.socialNetwork = info
        } else {
          this.socialNetwork = {
            id: '',
            key: '',
            title: '',
            detail: []
          }
        }
      });
    }
  }
}
