import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { getDownloadURL} from '@firebase/storage';
import { Education } from 'src/app/interfaces/education';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  educationAll: Array<Education>
  education: Education
  imageList: any

  constructor(private portafolioService: PortafolioService, private storageService: StorageService) {
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

  loadData(){
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
