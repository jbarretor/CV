import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Header } from '@interface/header';
import { SocialNetwork } from '@interface/social-network';
import { PortafolioService } from '@services/portafolio';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  @Input()
  socialNetwork: SocialNetwork
  private headerAll: Array<Header>
  protected header: Header
  // socialNetworkSimple: SocialNetworSimple

  constructor(private portafolioService: PortafolioService) {
    this.headerAll = []
    this.header = {
      id: '',
      key: '',
      name: '',
      title: '',
      hide: true
    }

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

  ngOnChanges(): void {
    this.loadData()
  }

  private loadData() {
    if (this.headerAll.length > 0) {
      let info = this.headerAll.find(x => x.key == this.lang)
      if (info) {
        this.header = info
      } else {
        this.header = {
          id: '',
          key: '',
          name: '',
          title: '',
          hide: true
        }
      }
    } else {
      this.portafolioService.readHeader().subscribe(header => {
        this.headerAll = header
        let info = header.find(x => x.key == this.lang)
        if (info) {
          this.header = info
        } else {
          this.header = {
            id: '',
            key: '',
            name: '',
            title: '',
            hide: true
          }
        }
      })
    }
  }
}