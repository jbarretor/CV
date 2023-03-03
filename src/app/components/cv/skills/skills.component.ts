import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { Skills } from 'src/app/interfaces/skills';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  skillsAll: Array<Skills>
  skills: Skills

  constructor(private portafolioService: PortafolioService) {
    this.skillsAll = []
    this.skills = {
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
    if (this.skillsAll.length > 0) {
      let info = this.skillsAll.find(x => x.key == this.lang)
      if (info) {
        this.skills = info
      } else {
        this.skills = {
          id: '',
          key: '',
          title: '',
          detail: []
        }
      }
    } else {
      this.portafolioService.readSkills().subscribe(skills => {
        this.skillsAll = skills
        let info = skills.find(x => x.key == this.lang)
        if (info) {
          this.skills = info
        } else {
          this.skills = {
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
