import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  private skillsAll: Array<Skills>
  protected skills: Skills

  constructor(private portafolioService: PortafolioService) {
    this.skillsAll = []
    this.skills = {
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
    if (this.skillsAll.length > 0) {
      let info = this.skillsAll.find(x => x.key == this.lang)
      if (info) {
        this.skills = info
      } else {
        this.skills = {
          id: '',
          key: '',
          title: '',
          hide: true,
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
            hide: true,
            detail: []
          }
        }
      })
    }
  }
}
