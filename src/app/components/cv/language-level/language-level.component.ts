import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Language } from '@interface/language';
import { PortafolioService } from '@services/portafolio';

@Component({
  selector: 'app-language',
  templateUrl: './language-level.component.html',
  styleUrls: ['./language-level.component.scss']
})
export class LanguageLevelComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  private languageAll: Array<Language>
  protected language: Language

  constructor(private portafolioService: PortafolioService) {
    this.languageAll = []
    this.language = {
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

  private loadData() {
    if (this.languageAll.length > 0) {
      let info = this.languageAll.find(x => x.key == this.lang)
      this.settingInformation(info)
    } else {
      this.portafolioService.readLanguage().subscribe(language => {
        this.languageAll = language
        let info = language.find(x => x.key == this.lang)
        this.settingInformation(info)
      })
    }
  }

  private settingInformation(info: Language){
    if (info) {
      this.language = info
    } else {
      this.language = {
        id: '',
        key: '',
        title: '',
        hide: true,
        detail: []
      }
    }
  }
}