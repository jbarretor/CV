import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Experience } from 'src/app/interfaces/experience';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  experienceAll: Array<Experience>
  experience: Experience
  readMore: string
  readLess: string

  constructor(private portafolioService: PortafolioService) {
    this.experienceAll = []
    this.experience = {
      id: '',
      key: '',
      title: '',
      detail: [{
        index: 0,
        company: '',
        url: '',
        imagePath: '',
        position: '',
        period: '',
        startDate: '',
        endDate: '',
        description: []
      }]
    }
    this.readMore = ''
    this.readLess = ''
  }

  ngOnInit(): void {
    this.loadData()
  }

  ngOnChanges(): void {
    this.loadData()
  }

  loadData(){
    if (this.experienceAll.length > 0) {
      let info = this.experienceAll.find(x => x.key == this.lang)
      if (info) {
        this.experience = info
      } else {
        this.experience = {
          id: '',
          key: '',
          title: '',
          detail: []
        }
      }
    } else {
      this.portafolioService.readExperience().subscribe(experience => {
        this.experienceAll = experience
        let info = experience.find(x => x.key == this.lang)
        if (info) {
          this.experience = info
        } else {
          this.experience = {
            id: '',
            key: '',
            title: '',
            detail: []
          }
        }
      })
    }
  }
}