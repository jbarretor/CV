import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Education } from '@interface/education';
import { PortafolioService } from '@services/portafolio';
import { Util } from '@util';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  private educationAll: Array<Education>
  protected education: Education

  constructor(private portafolioService: PortafolioService) {
    this.educationAll = []
    this.education = {
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

  private loadData(){
    if (!Util.arrayIsNullOrEmpty(this.educationAll)) {
      let info = this.educationAll.find(x => x.key == this.lang)
      this.settingInformation(info)
    } else {
      this.portafolioService.readEducation().subscribe(education => {
        this.educationAll = education
        let info = education.find(x => x.key == this.lang)
        this.settingInformation(info)
      })
    }
  }

  private settingInformation(info: Education){
    if (info) {
      this.education = info
    } else {
      this.education = {
        id: '',
        key: '',
        title: '',
        hide: true,
        detail: []
      }
    }
  }
}
