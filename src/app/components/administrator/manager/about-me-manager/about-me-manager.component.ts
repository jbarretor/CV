import { Component, OnInit } from '@angular/core'
import { getDownloadURL } from '@angular/fire/storage'
import { FormControl, FormGroup } from '@angular/forms'
import { AboutMe } from '@interface/about-me'
import { PortafolioService } from '@services/portafolio'
import { StorageService } from '@services/storage'

@Component({
	selector: 'app-about-me-manager',
	templateUrl: './about-me-manager.component.html',
	styleUrls: ['./about-me-manager.component.scss'],
})
export class AboutMeManagerComponent implements OnInit {
	private lang: string
	private imgPath: string
	private aboutMeAll: Array<AboutMe>
	protected aboutMe: AboutMe
	protected description: string
	protected form: FormGroup

	constructor(
		private portafolioService: PortafolioService,
		private storageService: StorageService
	) {
		this.aboutMeAll = []
		this.imgPath = ''
		this.lang = 'en'
		this.resetFields()
	}

	ngOnInit(): void {
		this.loadData(this.lang)
	}

	private loadData(lang: string) {
		this.lang = lang

		if (this.aboutMeAll.length > 0) {
			let info = this.aboutMeAll.find((x) => x.key == lang)
			this.settingInformation(info)
		} else {
			this.portafolioService.readAboutMe().subscribe((aboutMe) => {
				this.aboutMeAll = aboutMe
				let info = aboutMe ? aboutMe.find((x) => x.key == lang) : null
				this.settingInformation(info)
			})
		}
	}

	private settingInformation(info: AboutMe){
		if (info) {
			this.resetFields()
			this.aboutMe = info
			this.aboutMe.hide = this.aboutMe.hide.toString() == "" ? false : this.aboutMe.hide
			this.aboutMe.description.forEach((desc) => {
				this.description += `${desc}\n`
			})
			this.description = this.description.trim()
			this.imgPath = this.aboutMe.image
			this.form = new FormGroup({
				title: new FormControl(this.aboutMe.title),
				image: new FormControl(this.aboutMe.image),
				description: new FormControl(this.description),
			})
		}
	}

	private resetFields() {
		this.aboutMe = {
			id: '',
			key: '',
			title: '',
			hide: false,
			description: [],
			image: '',
		}
		this.description = ''
		this.form = new FormGroup({
			title: new FormControl(''),
			image: new FormControl(''),
			description: new FormControl(''),
		})
	}

	protected onClickEn() {
		this.loadData('en')
	}

	protected onClickEs() {
		this.loadData('es')
	}

	protected uploadImage($event: any) {
		this.storageService
			.saveImage('image/about-me/', $event)
			.then(async (rs) => {
				this.aboutMe.image = await getDownloadURL(rs.ref)
				this.imgPath = this.aboutMe.image
			})
			.catch((err) => console.log(err))
	}

	protected onSubmit() {
		let description = this.form.value.description.trim().split('\n')

		this.aboutMe = {
			id: this.aboutMe.id ? this.aboutMe.id : '',
			key: this.lang,
			title: this.form.value.title,
			hide: this.aboutMe.hide,
			description: description,
			image: this.imgPath,
		}

		this.portafolioService.updateAboutMe(this.aboutMe)
	}
}
