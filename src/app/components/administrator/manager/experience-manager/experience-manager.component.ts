import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { getDownloadURL } from '@angular/fire/storage'
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Experience } from 'src/app/interfaces/experience'
import { ExperienceDetail } from 'src/app/interfaces/experience-detail'
import { PortafolioService } from 'src/app/services/portafolio.service'
import { StorageService } from 'src/app/services/storage.service'

declare var window: any

@Component({
	selector: 'app-experience-manager',
	templateUrl: './experience-manager.component.html',
	styleUrls: ['./experience-manager.component.scss'],
})
export class ExperienceManagerComponent implements OnInit {
	private lang: string
	private imgPath: string
	private formModal: any
	protected experience: Experience
	protected experienceDetail: ExperienceDetail
	protected form: FormGroup
	protected formExperience: FormGroup

	@ViewChild('fileInputExp')
	private fileUploader: ElementRef

	constructor(
		private portafolioService: PortafolioService,
		private storageService: StorageService
	) {
		this.resetFields()
		this.experience = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.lang = 'en'
	}

	ngOnInit(): void {
		this.loadData(this.lang)

		this.formModal = new window.bootstrap.Modal(
			document.getElementById('experienceModal')
		)
	}

	private loadData(lang: string) {
		this.lang = lang

		this.portafolioService.readExperience().subscribe((experience) => {
			let info = experience ? experience.find((x) => x.key == lang) : null
			this.settingInformation(info)
		})
	}

	private settingInformation(info: Experience){
		if (info) {
			this.resetFields()
			info.detail = info.detail.sort((one, two) =>
				one.index > two.index ? -1 : 1
			)
			this.experience = info
			this.experience.hide = this.experience.hide.toString() == "" ? false : this.experience.hide
			this.form = new FormGroup({
				title: new FormControl(this.experience.title),
			})
		} else {
			this.resetFields()
		}
	}

	private resetFields() {
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formExperience = new FormGroup({
			index: new FormControl(''),
			company: new FormControl(''),
			url: new FormControl(''),
			imagePath: new FormControl(''),
			position: new FormControl(''),
			period: new FormControl(''),
			startDate: new FormControl(''),
			endDate: new FormControl(''),
			description: new FormControl(''),
		})
		this.formExperience.get('imagePath')?.disable()
		this.experienceDetail = {
			index: 0,
			company: '',
			url: '',
			imagePath: '',
			position: '',
			period: '',
			startDate: '',
			endDate: '',
			description: [],
			descString: '',
		}
		this.imgPath = ''
	}

	protected onClickEn() {
		this.experience = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.loadData('en')
	}

	protected onClickEs() {
		this.experience = {
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
			.saveImage('image/experience/', $event)
			.then(async (rs) => {
				this.experienceDetail.imagePath = await getDownloadURL(rs.ref)
				this.imgPath = this.experienceDetail.imagePath
			})
			.catch((err) => console.log(err))
	}

	protected edit(index: number) {
		this.experienceDetail = this.experience.detail.find(
			(x) => x.index == index
		) as ExperienceDetail
		this.experienceDetail.descString = ''
		this.experienceDetail.description.forEach((element) => {
			this.experienceDetail.descString += `${element}\n`
		})
		this.experienceDetail.descString = this.experienceDetail.descString.trim()
		this.formExperience = new FormGroup({
			index: new FormControl(this.experienceDetail.index),
			company: new FormControl(this.experienceDetail.company),
			url: new FormControl(this.experienceDetail.url),
			imagePath: new FormControl(this.experienceDetail.imagePath),
			position: new FormControl(this.experienceDetail.position),
			period: new FormControl(this.experienceDetail.period),
			startDate: new FormControl(this.experienceDetail.startDate),
			endDate: new FormControl(this.experienceDetail.endDate),
			description: new FormControl(this.experienceDetail.descString),
		})
		this.imgPath = this.experienceDetail.imagePath

		this.formExperience.get('imagePath')?.disable()

		this.fileUploader.nativeElement.value = null;

		this.formModal.show()
	}

	protected delete(index: number) {
		let exp = this.experience.detail.find(
			(x) => x.index == index
		) as ExperienceDetail
		let pos = this.experience.detail.indexOf(exp)
		this.experience.detail.splice(pos, 1)
		this.portafolioService.updateExperience(this.experience)
	}

	protected onSubmit() {
		this.experience = {
			id: this.experience.id ? this.experience.id : '',
			key: this.lang,
			title: this.form.value.title,
			hide: this.experience.hide,
			detail: this.experience.detail ? this.experience.detail : [],
		}

		if (this.experience.id) {
			this.portafolioService.updateExperience(this.experience)
		} else {
			this.portafolioService.createExperience(this.experience)
		}
	}

	protected onSubmitExp() {
		let exp = this.experience.detail.find(
			(x) => x.index == this.experienceDetail.index
		) as ExperienceDetail

		if (exp) {
			let index = this.experience.detail.indexOf(exp)
			this.experience.detail[index].index = this.formExperience.value.index
			this.experience.detail[index].company = this.formExperience.value.company
			this.experience.detail[index].url = this.formExperience.value.url
			this.experience.detail[index].imagePath = this.imgPath
			this.experience.detail[index].position =
				this.formExperience.value.position
			this.experience.detail[index].period = this.formExperience.value.period
			this.experience.detail[index].startDate =
				this.formExperience.value.startDate
			this.experience.detail[index].endDate = this.formExperience.value.endDate
			this.experience.detail[index].description =
				this.formExperience.value.description.split('\n')
			this.experience.detail[index].descString = ''
			this.portafolioService.updateExperience(this.experience)
		} else {
			this.experienceDetail = {
				index: this.formExperience.value.index,
				company: this.formExperience.value.company,
				url: this.formExperience.value.url,
				imagePath: this.imgPath,
				position: this.formExperience.value.position,
				period: this.formExperience.value.period,
				startDate: this.formExperience.value.startDate,
				endDate: this.formExperience.value.endDate,
				description: this.formExperience.value.description.split('\n'),
				descString: '',
			}
			this.experience.detail.push(this.experienceDetail)
			this.experience.detail = this.experience.detail.sort((one, two) =>
				one.index > two.index ? -1 : 1
			)

			this.portafolioService.updateExperience(this.experience)
		}
		
		this.fileUploader.nativeElement.value = null;

		this.closeModal()
	}

	protected openModal() {
		this.formExperience = new FormGroup({
			index: new FormControl(''),
			company: new FormControl(''),
			url: new FormControl(''),
			imagePath: new FormControl(''),
			position: new FormControl(''),
			period: new FormControl(''),
			startDate: new FormControl(''),
			endDate: new FormControl(''),
			description: new FormControl(''),
		})
		this.formExperience.get('imagePath')?.disable()
		this.experienceDetail = {
			index: 0,
			company: '',
			url: '',
			imagePath: '',
			position: '',
			period: '',
			startDate: '',
			endDate: '',
			description: [],
			descString: '',
		}

		this.formModal.show()
	}

	protected closeModal() {
		this.formModal.hide()

		this.formExperience = new FormGroup({
			index: new FormControl(''),
			company: new FormControl(''),
			url: new FormControl(''),
			imagePath: new FormControl(''),
			position: new FormControl(''),
			period: new FormControl(''),
			startDate: new FormControl(''),
			endDate: new FormControl(''),
			description: new FormControl(''),
		})

		this.experienceDetail = {
			index: 0,
			company: '',
			url: '',
			imagePath: '',
			position: '',
			period: '',
			startDate: '',
			endDate: '',
			description: [],
			descString: '',
		}
	}
}
