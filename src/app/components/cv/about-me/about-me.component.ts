import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AboutMe } from 'src/app/interfaces/about-me';
import { PortafolioService } from 'src/app/services/portafolio.service';

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
    if (this.aboutMeAll.length > 0) {
      let info = this.aboutMeAll.find(x => x.key == this.lang)
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
    } else {
      this.portafolioService.readAboutMe().subscribe(aboutMe => {
        this.aboutMeAll = aboutMe
        let info = aboutMe.find(x => x.key == this.lang)
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
      })
    }
  }
}
