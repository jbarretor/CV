import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Header } from 'src/app/interfaces/header';
import { SocialNetwork } from 'src/app/interfaces/social-network';
import { PortafolioService } from 'src/app/services/portafolio.service';

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
      title: ''
    }

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
          title: ''
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
            title: ''
          }
        }
      })
    }
  }
}