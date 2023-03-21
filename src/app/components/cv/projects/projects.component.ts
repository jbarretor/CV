import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Projects } from 'src/app/interfaces/projects';
import { PortafolioService } from 'src/app/services/portafolio.service';

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
    if (this.projectsAll.length > 0) {
      let info = this.projectsAll.find(x => x.key == this.lang)
      if (info) {
        this.projects = info
      } else {
        this.projects = {
          id: '',
          key: '',
          title: '',
          detail: []
        }
      }
    } else {
      this.portafolioService.readProjects().subscribe(projects => {
        this.projectsAll = projects
        let info = projects.find(x => x.key == this.lang)
        if (info) {
          this.projects = info
        } else {
          this.projects = {
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
