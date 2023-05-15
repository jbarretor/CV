import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Skills } from '@interface/skills'
import { SkillsDetail } from '@interface/skills-detail'
import { PortafolioService } from '@services/portafolio'
import { StorageService } from '@services/storage'
import { getDownloadURL } from '@firebase/storage'

declare var window: any

@Component({
	selector: 'app-skills-manager',
	templateUrl: './skills-manager.component.html',
	styleUrls: ['./skills-manager.component.scss'],
})
export class SkillsManagerComponent implements OnInit {
	private lang: string
	private imgPath: string
	private formModal: any
	protected skills: Skills
	protected skillsDetail: SkillsDetail
	protected form: FormGroup
	protected formSkill: FormGroup

	@ViewChild('fileInputSkll')
	private fileUploader: ElementRef

	constructor(
		private portafolioService: PortafolioService,
		private storageService: StorageService
	) {
		this.skills = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.skillsDetail = {
			index: 0,
			skillName: '',
			fileSvg: '',
		}
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formSkill = new FormGroup({
			index: new FormControl(''),
			skillName: new FormControl(''),
			fileSvg: new FormControl(''),
		})
		this.imgPath = ''
		this.lang = 'en'
	}

	ngOnInit(): void {
		this.loadData(this.lang)

		this.formModal = new window.bootstrap.Modal(
			document.getElementById('skillModal')
		)
	}

	private loadData(lang: string) {
		this.lang = lang

		this.portafolioService.readSkills().subscribe((skills) => {
			let info = skills ? skills.find((x) => x.key == lang) : null
			this.settingInformation(info)
		})
	}

	private settingInformation(info: Skills){
		if (info) {
			this.resetFields()
			this.skills = info
			this.skills.hide = this.skills.hide.toString() == "" ? false : this.skills.hide
			this.form = new FormGroup({
				title: new FormControl(this.skills.title),
			})
		} else {
			this.resetFields()
		}
	}

	private resetFields() {
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formSkill = new FormGroup({
			index: new FormControl(''),
			skillName: new FormControl(''),
			fileSvg: new FormControl(''),
		})
		this.formSkill.get('fileSvg')?.disable()
		this.skillsDetail = {
			index: 0,
			skillName: '',
			fileSvg: '',
		}
		this.imgPath = ''
	}

	protected onClickEn() {
		this.skills = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.loadData('en')
	}

	protected onClickEs() {
		this.skills = {
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
			.saveImage('svg/skills/', $event)
			.then(async (rs) => {
				this.skillsDetail.fileSvg = await getDownloadURL(rs.ref)
				this.imgPath = this.skillsDetail.fileSvg
			})
			.catch((err) => console.log(err))
	}

	protected edit(index: number) {
		this.skillsDetail = this.skills.detail.find(
			(x) => x.index == index
		) as SkillsDetail
		this.formSkill = new FormGroup({
			index: new FormControl(this.skillsDetail.index),
			skillName: new FormControl(this.skillsDetail.skillName),
			fileSvg: new FormControl(this.skillsDetail.fileSvg),
		})
		this.imgPath = this.skillsDetail.fileSvg

		this.formSkill.get('fileSvg')?.disable()

		this.fileUploader.nativeElement.value = null;

		this.formModal.show()
	}

	protected delete(index: number) {
		let exp = this.skills.detail.find((x) => x.index == index) as SkillsDetail
		let pos = this.skills.detail.indexOf(exp)
		this.skills.detail.splice(pos, 1)
		this.portafolioService.updateSkills(this.skills)
	}

	protected onSubmit() {
		this.skills = {
			id: this.skills.id ? this.skills.id : '',
			key: this.lang,
			title: this.form.value.title,
			hide: this.skills.hide,
			detail: this.skills.detail ? this.skills.detail : [],
		}

		if (this.skills.id) {
			this.portafolioService.updateSkills(this.skills)
		} else {
			this.portafolioService.createSkills(this.skills)
		}
	}

	protected onSubmitSkill() {
		let exp = this.skills.detail.find(
			(x) => x.index == this.skillsDetail.index
		) as SkillsDetail

		if (exp) {
			let index = this.skills.detail.indexOf(exp)
			this.skills.detail[index].index = this.formSkill.value.index
			this.skills.detail[index].skillName = this.formSkill.value.skillName
			this.skills.detail[index].fileSvg = this.imgPath

			this.portafolioService.updateSkills(this.skills)
		} else {
			this.skillsDetail = {
				index: this.formSkill.value.index,
				skillName: this.formSkill.value.skillName,
				fileSvg: this.imgPath,
			}
			this.skills.detail.push(this.skillsDetail)

			this.portafolioService.updateSkills(this.skills)
		}

		this.fileUploader.nativeElement.value = null;

		this.closeModal()
	}

	protected openModal() {
		this.formSkill = new FormGroup({
			index: new FormControl(''),
			skillName: new FormControl(''),
			fileSvg: new FormControl(''),
		})
		this.formSkill.get('fileSvg')?.disable()
		this.skillsDetail = {
			index: 0,
			skillName: '',
			fileSvg: '',
		}

		this.formModal.show()
	}

	protected closeModal() {
		this.formModal.hide()

		this.formSkill = new FormGroup({
			index: new FormControl(''),
			skillName: new FormControl(''),
			fileSvg: new FormControl(''),
		})
		this.skillsDetail = {
			index: 0,
			skillName: '',
			fileSvg: '',
		}
	}
}
