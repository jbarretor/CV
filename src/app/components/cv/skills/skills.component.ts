import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Skills } from '@interface/skills';
import { PortafolioService } from '@services/portafolio';
import { Util } from '@util';

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
    if (!Util.arrayIsNullOrEmpty(this.skillsAll)) {
      let info = this.skillsAll.find(x => x.key == this.lang)
      this.settingInformation(info)
    } else {
      this.portafolioService.readSkills().subscribe(skills => {
        this.skillsAll = skills
        let info = skills.find(x => x.key == this.lang)
        this.settingInformation(info)
      })
    }
  }

  private settingInformation(info: Skills){
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
  }
}
