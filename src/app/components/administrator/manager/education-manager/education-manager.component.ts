import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Education } from 'src/app/interfaces/education'
import { EducationDetail } from 'src/app/interfaces/education-detail'
import { PortafolioService } from 'src/app/services/portafolio.service'
import { StorageService } from 'src/app/services/storage.service'
import { getDownloadURL } from '@firebase/storage'

declare var window: any

@Component({
	selector: 'app-education-manager',
	templateUrl: './education-manager.component.html',
	styleUrls: ['./education-manager.component.scss'],
})
export class EducationManagerComponent implements OnInit {
	private lang: string
	private imgPath: string
	private formModal: any
	protected education: Education
	protected educationDetail: EducationDetail
	protected form: FormGroup
	protected formEducation: FormGroup

	constructor(
		private portafolioService: PortafolioService,
		private storageService: StorageService
	) {
		this.education = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.educationDetail = {
			index: 0,
			imagePath: '',
			university: '',
			degree: '',
			period: '',
			url: '',
		}
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formEducation = new FormGroup({
			index: new FormControl(''),
			imagePath: new FormControl(''),
			university: new FormControl(''),
			degree: new FormControl(''),
			period: new FormControl(''),
			url: new FormControl(''),
		})
		this.imgPath = ''
		this.lang = 'en'
	}

	ngOnInit(): void {
		this.loadData(this.lang)

		this.formModal = new window.bootstrap.Modal(
			document.getElementById('educationModal')
		)
	}

	private loadData(lang: string) {
		this.lang = lang

		this.portafolioService.readEducation().subscribe((education) => {
			let info = education ? education.find((x) => x.key == lang) : null
			if (info) {
				this.resetFields()
				this.education = info
				this.education.hide = this.education.hide.toString() == "" ? false : this.education.hide
				this.form = new FormGroup({
					title: new FormControl(this.education.title),
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
		this.formEducation = new FormGroup({
			index: new FormControl(''),
			imagePath: new FormControl(''),
			university: new FormControl(''),
			degree: new FormControl(''),
			period: new FormControl(''),
			url: new FormControl(''),
		})
		this.formEducation.get('imagePath')?.disable()
		this.educationDetail = {
			index: 0,
			imagePath: '',
			university: '',
			degree: '',
			period: '',
			url: '',
		}
		this.imgPath = ''
	}

	protected onClickEn() {
		this.education = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.loadData('en')
	}

	protected onClickEs() {
		this.education = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.loadData('es')
	}

	protected uploadImage($event: any) {
		this.storageService
			.saveImage('image/education/', $event)
			.then(async (rs) => {
				this.educationDetail.imagePath = await getDownloadURL(rs.ref)
				this.imgPath = this.educationDetail.imagePath
			})
			.catch((err) => console.log(err))
	}

	protected edit(index: number) {
		this.educationDetail = this.education.detail.find(
			(x) => x.index == index
		) as EducationDetail
		this.formEducation = new FormGroup({
			index: new FormControl(this.educationDetail.index),
			imagePath: new FormControl(this.educationDetail.imagePath),
			university: new FormControl(this.educationDetail.university),
			degree: new FormControl(this.educationDetail.degree),
			period: new FormControl(this.educationDetail.period),
			url: new FormControl(this.educationDetail.url),
		})
		this.imgPath = this.educationDetail.imagePath

		this.formEducation.get('imagePath')?.disable()

		this.formModal.show()
	}

	protected delete(index: number) {
		let exp = this.education.detail.find(
			(x) => x.index == index
		) as EducationDetail
		let pos = this.education.detail.indexOf(exp)
		this.education.detail.splice(pos, 1)
		this.portafolioService.updateEducation(this.education)
	}

	protected onSubmit() {
		this.education = {
			id: this.education.id ? this.education.id : '',
			key: this.lang,
			title: this.form.value.title,
			hide: this.education.hide,
			detail: this.education.detail ? this.education.detail : [],
		}

		if (this.education.id) {
			this.portafolioService.updateEducation(this.education)
		} else {
			this.portafolioService.createEducation(this.education)
		}
	}

	protected onSubmitEdu() {
		let exp = this.education.detail.find(
			(x) => x.index == this.educationDetail.index
		) as EducationDetail

		if (exp) {
			let index = this.education.detail.indexOf(exp)
			this.education.detail[index].index = this.formEducation.value.index
			this.education.detail[index].imagePath = this.imgPath
			this.education.detail[index].university =
				this.formEducation.value.university
			this.education.detail[index].degree = this.formEducation.value.degree
			this.education.detail[index].period = this.formEducation.value.period
			this.education.detail[index].url = this.formEducation.value.url

			this.portafolioService.updateEducation(this.education)
		} else {
			this.educationDetail = {
				index: this.formEducation.value.index,
				imagePath: this.imgPath,
				university: this.formEducation.value.university,
				degree: this.formEducation.value.degree,
				period: this.formEducation.value.period,
				url: this.formEducation.value.url,
			}
			this.education.detail.push(this.educationDetail)
			this.education.detail = this.education.detail.sort((one, two) =>
				one.index > two.index ? -1 : 1
			)

			this.portafolioService.updateEducation(this.education)
		}

		this.closeModal()
	}

	protected openModal() {
		this.formEducation = new FormGroup({
			index: new FormControl(''),
			imagePath: new FormControl(''),
			university: new FormControl(''),
			degree: new FormControl(''),
			period: new FormControl(''),
			url: new FormControl(''),
		})
		this.formEducation.get('imagePath')?.disable()
		this.educationDetail = {
			index: 0,
			imagePath: '',
			university: '',
			degree: '',
			period: '',
			url: '',
		}

		this.formModal.show()
	}

	protected closeModal() {
		this.formModal.hide()

		this.formEducation = new FormGroup({
			index: new FormControl(''),
			imagePath: new FormControl(''),
			university: new FormControl(''),
			degree: new FormControl(''),
			period: new FormControl(''),
			url: new FormControl(''),
		})
		this.educationDetail = {
			index: 0,
			imagePath: '',
			university: '',
			degree: '',
			period: '',
			url: '',
		}
	}
}
