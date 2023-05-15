import { Component, OnInit } from '@angular/core';
import { SocialNetwork } from '@interface/social-network';
import { PortafolioService } from '@services/portafolio';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  private socialNetworkAll: Array<SocialNetwork>
  protected socialNetwork: SocialNetwork
  protected lang: string = 'en'

  constructor(private portafolioService: PortafolioService) {
    this.socialNetworkAll = []
    this.socialNetwork = {
      id: '',
      key: '',
      title: '',
      hide: true,
      detail: []
    }
  }

  ngOnInit(): void {
    this.loadData()
  }

  protected changeLang(lang: string) {
    this.lang = lang
    this.loadData()
  }

  private loadData() {
    if (this.socialNetworkAll.length > 0) {
      let info = this.socialNetworkAll.find(x => x.key == this.lang)
      this.settingInformation(info)
    } else {
      this.portafolioService.readSocialNetwork().subscribe(socialNetwork => {
        this.socialNetworkAll = socialNetwork
        let info = socialNetwork.find(x => x.key == this.lang)
        this.settingInformation(info)
      });
    }
  }

  private settingInformation(info: SocialNetwork){
    if (info) {
      this.socialNetwork = info
    } else {
      this.socialNetwork = {
        id: '',
        key: '',
        title: '',
        hide: true,
        detail: []
      }
    }
  }
}
