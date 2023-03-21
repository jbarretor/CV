import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Education } from 'src/app/interfaces/education';
import { PortafolioService } from 'src/app/services/portafolio.service';

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
    if (this.educationAll.length > 0) {
      let info = this.educationAll.find(x => x.key == this.lang)
      if (info) {
        this.education = info
      } else {
        this.education = {
          id: '',
          key: '',
          title: '',
          detail: []
        }
      }
    } else {
      this.portafolioService.readEducation().subscribe(education => {
        this.educationAll = education
        let info = education.find(x => x.key == this.lang)
        if (info) {
          this.education = info
        } else {
          this.education = {
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
