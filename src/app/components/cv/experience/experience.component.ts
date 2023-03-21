import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Experience } from 'src/app/interfaces/experience';
import { ExperienceDetail } from 'src/app/interfaces/experience-detail';
import { PortafolioService } from 'src/app/services/portafolio.service';

declare var window: any

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  private experienceAll: Array<Experience>
  private formModal: any
  protected experience: Experience
  protected experienceDetail: ExperienceDetail

  constructor(private portafolioService: PortafolioService) {
    this.experienceAll = []
    this.experience = {
      id: '',
      key: '',
      title: '',
      detail: []
    }
    this.experienceDetail = {
      index: 0,
      company: '',
      url: '',
      imagePath: '',
      position: '',
      period: '',
      startDate: '',
      endDate: '',
      description: []
    }
  }

  ngOnInit(): void {
    this.loadData()

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    )
  }

  ngOnChanges(): void {
    this.loadData()
  }

  private loadData() {
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

  protected openModal(index: number) {
    this.experienceDetail = this.experience.detail.find(x => x.index == index) as ExperienceDetail

    this.formModal.show()
  }

  protected closeModal() {
    this.experienceDetail = {
      index: 0,
      company: '',
      url: '',
      imagePath: '',
      position: '',
      period: '',
      startDate: '',
      endDate: '',
      description: []
    }

    this.formModal.hide()
  }

  protected next() {
    let pos = this.experience.detail.indexOf(this.experienceDetail)
    let length = this.experience.detail.length

    if (pos == length - 1) {
      pos = 0
    } else {
      pos = pos + 1
    }

    this.experienceDetail = this.experience.detail[pos]
  }

  protected last() {
    let pos = this.experience.detail.indexOf(this.experienceDetail)
    let length = this.experience.detail.length

    if (pos == 0) {
      pos = length - 1
    } else {
      pos = pos - 1
    }

    this.experienceDetail = this.experience.detail[pos]
  }
}