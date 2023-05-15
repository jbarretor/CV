import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Projects } from '@interface/projects';
import { PortafolioService } from '@services/portafolio';
import { Util } from '@util';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  private projectsAll: Array<Projects>
  protected projects: Projects

  constructor(private portafolioService: PortafolioService) {
    this.projectsAll = []
    this.projects = {
      id: '',
      key: '',
      title: '',
      hide: true,
      detail: [],
    }
  }

  ngOnInit(): void {
    this.loadData()
  }

  ngOnChanges(): void {
    this.loadData()
  }

  private loadData(){
    if (!Util.arrayIsNullOrEmpty(this.projectsAll)) {
      let info = this.projectsAll.find(x => x.key == this.lang)
      this.settingInformation(info)
    } else {
      this.portafolioService.readProjects().subscribe(projects => {
        this.projectsAll = projects
        let info = projects.find(x => x.key == this.lang)
        this.settingInformation(info)
      })
    }
  }

  private settingInformation(info: Projects){
    if (info) {
      this.projects = info
    } else {
      this.projects = {
        id: '',
        key: '',
        title: '',
        hide: true,
        detail: []
      }
    }
  }
}
