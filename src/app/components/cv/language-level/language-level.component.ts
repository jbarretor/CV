import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Language } from 'src/app/interfaces/language';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-language',
  templateUrl: './language-level.component.html',
  styleUrls: ['./language-level.component.scss']
})
export class LanguageLevelComponent implements OnInit, OnChanges {

  @Input()
  lang: string = ''
  languageAll: Array<Language>
  language: Language

  constructor(private portafolioService: PortafolioService) {
    this.languageAll = []
    this.language = {
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

  loadData() {
    if (this.languageAll.length > 0) {
      let info = this.languageAll.find(x => x.key == this.lang)
      if (info) {
        this.language = info
      } else {
        this.language = {
          id: '',
          key: '',
          title: '',
          detail: []
        }
      }
    } else {
      this.portafolioService.readLanguage().subscribe(language => {
        this.languageAll = language
        let info = language.find(x => x.key == this.lang)
        if (info) {
          this.language = info
        } else {
          this.language = {
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