import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Language } from '@interface/language'
import { LanguageDetail } from '@interface/language-detail'
import { PortafolioService } from '@services/portafolio'

declare var window: any

@Component({
	selector: 'app-language-manager',
	templateUrl: './language-level-manager.component.html',
	styleUrls: ['./language-level-manager.component.scss'],
})
export class LanguageManagerComponent implements OnInit {
	private lang: string
	private formModal: any
	protected language: Language
	protected languageDetail: LanguageDetail
	protected form: FormGroup
	protected formLanguage: FormGroup

	constructor(private portafolioService: PortafolioService) {
		this.language = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.languageDetail = {
			index: 0,
			language: '',
			level: '',
			detail: '',
			percent: '',
		}
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formLanguage = new FormGroup({
			index: new FormControl(''),
			language: new FormControl(''),
			level: new FormControl(''),
			detail: new FormControl(''),
			percent: new FormControl(''),
		})
		this.lang = 'en'
	}

	ngOnInit(): void {
		this.loadData(this.lang)

		this.formModal = new window.bootstrap.Modal(
			document.getElementById('languageModal')
		)
	}

	private loadData(lang: string) {
		this.lang = lang

		this.portafolioService.readLanguage().subscribe((language) => {
			let info = language ? language.find((x) => x.key == lang) : null
			this.settingInformation(info)
		})
	}

	private settingInformation(info: Language){
		if (info) {
			this.resetFields()
			this.language = info
			this.language.hide = this.language.hide.toString() == "" ? false : this.language.hide
			this.form = new FormGroup({
				title: new FormControl(this.language.title),
			})
		} else {
			this.resetFields()
		}
	}

	private resetFields() {
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formLanguage = new FormGroup({
			index: new FormControl(''),
			language: new FormControl(''),
			level: new FormControl(''),
			detail: new FormControl(''),
			percent: new FormControl(''),
		})
		this.languageDetail = {
			index: 0,
			language: '',
			level: '',
			detail: '',
			percent: '',
		}
	}

	protected onClickEn() {
		this.language = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.loadData('en')
	}

	protected onClickEs() {
		this.language = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.loadData('es')
	}

	protected edit(index: number) {
		this.languageDetail = this.language.detail.find(
			(x) => x.index == index
		) as LanguageDetail
		this.formLanguage = new FormGroup({
			index: new FormControl(this.languageDetail.index),
			language: new FormControl(this.languageDetail.language),
			level: new FormControl(this.languageDetail.level),
			detail: new FormControl(this.languageDetail.detail),
			percent: new FormControl(this.languageDetail.percent),
		})

		this.openModal()
	}

	protected delete(index: number) {
		let exp = this.language.detail.find(
			(x) => x.index == index
		) as LanguageDetail
		let pos = this.language.detail.indexOf(exp)
		this.language.detail.splice(pos, 1)
		this.portafolioService.updateLanguage(this.language)
	}

	protected onSubmit() {
		this.language = {
			id: this.language.id ? this.language.id : '',
			key: this.lang,
			title: this.form.value.title,
			hide: this.language.hide,
			detail: this.language.detail ? this.language.detail : [],
		}

		if (this.language.id) {
			this.portafolioService.updateLanguage(this.language)
		} else {
			this.portafolioService.createLanguage(this.language)
		}
	}

	protected onSubmitLanguage() {
		let exp = this.language.detail.find(
			(x) => x.index == this.languageDetail.index
		) as LanguageDetail

		if (exp) {
			let index = this.language.detail.indexOf(exp)
			this.language.detail[index].index = this.formLanguage.value.index
			this.language.detail[index].language = this.formLanguage.value.language
			this.language.detail[index].level = this.formLanguage.value.level
			this.language.detail[index].detail = this.formLanguage.value.detail
			this.language.detail[index].percent = this.formLanguage.value.percent

			this.portafolioService.updateLanguage(this.language)
		} else {
			this.languageDetail = {
				index: this.formLanguage.value.index,
				language: this.formLanguage.value.language,
				level: this.formLanguage.value.level,
				detail: this.formLanguage.value.detail,
				percent: this.formLanguage.value.percent,
			}
			this.language.detail.push(this.languageDetail)

			this.portafolioService.updateLanguage(this.language)
		}

		this.closeModal()
	}

	protected openModal() {
		this.formModal.show()
	}

	protected closeModal() {
		this.formModal.hide()
	}
}
