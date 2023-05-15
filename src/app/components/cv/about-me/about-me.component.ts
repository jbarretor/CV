import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AboutMe } from '@interface/about-me';
import { PortafolioService } from '@services/portafolio';
import { Util } from '@util';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})

export class AboutMeComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  private aboutMeAll: Array<AboutMe>
  protected aboutMe: AboutMe

  constructor(private portafolioService: PortafolioService) {
    this.aboutMeAll = []
    this.aboutMe = {
      id: '',
      key: '',
      title: '',
      description: [],
      image: '',
      hide: true,
    };
  }

  ngOnInit(): void {
    this.loadData()
  }

  ngOnChanges(): void {
    this.loadData()
  }

  private loadData() {
    if (!Util.arrayIsNullOrEmpty(this.aboutMeAll)) {
      let info = this.aboutMeAll.find(x => x.key == this.lang)
      this.settingInformation(info)
    } else {
      this.portafolioService.readAboutMe().subscribe(aboutMe => {
        this.aboutMeAll = aboutMe
        let info = aboutMe.find(x => x.key == this.lang)
        this.settingInformation(info)
      })
    }
  }

  private settingInformation(info: AboutMe){
    if (info) {
      this.aboutMe = info
    } else {
      this.aboutMe = {
        id: '',
        key: '',
        title: '',
        description: [],
        image: '',
        hide: true
      }
    }
  }
}
