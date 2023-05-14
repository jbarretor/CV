import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { SocialNetwork } from 'src/app/interfaces/social-network'
import { SocialNetworkDetail } from 'src/app/interfaces/social-network-detail'
import { PortafolioService } from 'src/app/services/portafolio.service'

declare var window: any

@Component({
	selector: 'app-social-manager',
	templateUrl: './social-manager.component.html',
	styleUrls: ['./social-manager.component.scss'],
})
export class SocialManagerComponent implements OnInit {
	private lang: string
	private formModal: any
	protected social: SocialNetwork
	protected socialDetail: SocialNetworkDetail
	protected form: FormGroup
	protected formSocial: FormGroup

	constructor(
		private portafolioService: PortafolioService
	) {
		this.social = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.socialDetail = {
			index: 0,
			place: '',
			name: '',
			icon: '',
			url: '',
		}
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formSocial = new FormGroup({
			index: new FormControl(''),
			place: new FormControl(''),
			name: new FormControl(''),
			icon: new FormControl(''),
			url: new FormControl(''),
		})
		this.lang = 'en'
	}

	ngOnInit(): void {
		this.loadData(this.lang)

		this.formModal = new window.bootstrap.Modal(
			document.getElementById('socialModal')
		)
	}

	private loadData(lang: string) {
		this.lang = lang

		this.portafolioService.readSocialNetwork().subscribe((social) => {
			let info = social ? social.find((x) => x.key == lang) : null
			if (info) {
				this.resetFields()
				this.social = info
				this.social.hide = this.social.hide.toString() == "" ? false : this.social.hide
				this.form = new FormGroup({
					title: new FormControl(this.social.title),
				})
			} else {
				this.resetFields()
			}
		})
	}

	private resetFields() {
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formSocial = new FormGroup({
			index: new FormControl(''),
			place: new FormControl(''),
			name: new FormControl(''),
			icon: new FormControl(''),
			url: new FormControl(''),
		})
		this.socialDetail = {
			index: 0,
			place: '',
			name: '',
			icon: '',
			url: '',
		}
	}

	protected onClickEn() {
		this.social = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.loadData('en')
	}

	protected onClickEs() {
		this.social = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.loadData('es')
	}

	protected edit(index: number) {
		this.socialDetail = this.social.detail.find(
			(x) => x.index == index
		) as SocialNetworkDetail
		this.formSocial = new FormGroup({
			index: new FormControl(this.socialDetail.index),
			place: new FormControl(this.socialDetail.place),
			name: new FormControl(this.socialDetail.name),
			icon: new FormControl(this.socialDetail.icon),
			url: new FormControl(this.socialDetail.url),
		})

		this.openModal()
	}

	protected delete(index: number) {
		let exp = this.social.detail.find(
			(x) => x.index == index
		) as SocialNetworkDetail
		let pos = this.social.detail.indexOf(exp)
		this.social.detail.splice(pos, 1)
		this.portafolioService.updateSocialNetwork(this.social)
	}

	protected onSubmit() {
		this.social = {
			id: this.social.id ? this.social.id : '',
			key: this.lang,
			title: this.form.value.title,
			hide: this.social.hide,
			detail: this.social.detail ? this.social.detail : [],
		}

		if (this.social.id) {
			this.portafolioService.updateSocialNetwork(this.social)
		} else {
			this.portafolioService.createSocialNetwork(this.social)
		}
	}

	protected onSubmitSocial() {
		let exp = this.social.detail.find(
			(x) => x.index == this.socialDetail.index
		) as SocialNetworkDetail

		if (exp) {
			let index = this.social.detail.indexOf(exp)
			this.social.detail[index].index = this.formSocial.value.index
			this.social.detail[index].place = this.formSocial.value.place
			this.social.detail[index].name = this.formSocial.value.name
			this.social.detail[index].icon = this.formSocial.value.icon
			this.social.detail[index].url = this.formSocial.value.url

			this.portafolioService.updateSocialNetwork(this.social)
		} else {
			this.socialDetail = {
				index: this.formSocial.value.index,
				place: this.formSocial.value.place,
				name: this.formSocial.value.name,
				icon: this.formSocial.value.icon,
				url: this.formSocial.value.url,
			}
			console.log(this.socialDetail)
			this.social.detail.push(this.socialDetail)

			this.portafolioService.updateSocialNetwork(this.social)
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
