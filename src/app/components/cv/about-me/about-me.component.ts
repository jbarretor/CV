import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  aboutMeAll: Array<AboutMe>
  aboutMe: AboutMe
  form: FormGroup

  constructor(private portafolioService: PortafolioService) {
    this.aboutMeAll = []
    this.aboutMe = {
      id: '',
      key: '',
      title: '',
      description: [],
      image: ''
    };
    this.form = new FormGroup({
      key: new FormControl(),
      title: new FormControl(),
      description: new FormControl()
    })
  }

  ngOnInit(): void {
    this.loadData()
  }

  ngOnChanges(): void {
    this.loadData()
  }

  loadData() {
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
          image: ''
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
            image: ''
          }
        }
      })
    }
  }

  onSubmit() {
    this.form.value.description = this.form.value.description.split('\n');
    const response = this.portafolioService.createAboutMe(this.form.value);
    console.log(response);
  }
}
