import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { getDownloadURL } from '@angular/fire/storage'
import { FormControl, FormGroup } from '@angular/forms'
import { Projects } from '@interface/projects'
import { ProjectsDetail } from '@interface/projects-detail'
import { PortafolioService } from '@services/portafolio'
import { StorageService } from '@services/storage'

declare var window: any

@Component({
	selector: 'app-projects-manager',
	templateUrl: './projects-manager.component.html',
	styleUrls: ['./projects-manager.component.scss'],
})
export class ProjectsManagerComponent implements OnInit {
	private lang: string
	private imgPath: string
	private imgTech: string
	private formModal: any
	protected projects: Projects
	protected projectsDetail: ProjectsDetail
	protected form: FormGroup
	protected formProjects: FormGroup

	@ViewChild('fileInputPrj')
	private filePrjUploader: ElementRef

	@ViewChild('fileInputTch')
	private fileTchUploader: ElementRef

	constructor(
		private portafolioService: PortafolioService,
		private storageService: StorageService
	) {
		this.projects = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.projectsDetail = {
			index: 0,
			name: '',
			imagePath: '',
			url: '',
			technologies: [],
		}
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formProjects = new FormGroup({
			index: new FormControl(''),
			name: new FormControl(''),
			imagePath: new FormControl(''),
			url: new FormControl(''),
			technologies: new FormControl(''),
		})
		this.imgPath = ''
		this.imgTech = ''
		this.lang = 'en'
	}

	ngOnInit(): void {
		this.loadData(this.lang)

		this.formModal = new window.bootstrap.Modal(
			document.getElementById('projectModal')
		)
	}

	private loadData(lang: string) {
		this.lang = lang

		this.portafolioService.readProjects().subscribe((projects) => {
			let info = projects ? projects.find((x) => x.key == lang) : null
			this.settingInformation(info)
		})
	}

	private settingInformation(info: Projects){
		if (info) {
			this.resetFields()
			info.detail = info.detail.sort((one, two) =>
				one.index > two.index ? -1 : 1
			)
			this.projects = info
			this.projects.hide = this.projects.hide.toString() == "" ? false : this.projects.hide
			this.form = new FormGroup({
				title: new FormControl(this.projects.title),
			})
		} else {
			this.resetFields()
		}
	}

	private resetFields() {
		this.form = new FormGroup({
			title: new FormControl(''),
		})
		this.formProjects = new FormGroup({
			index: new FormControl(''),
			name: new FormControl(''),
			imagePath: new FormControl(''),
			url: new FormControl(''),
			technologies: new FormControl(''),
		})
		this.formProjects.get('imagePath')?.disable()
		this.formProjects.get('technologies')?.disable()
		this.projectsDetail = {
			index: 0,
			name: '',
			imagePath: '',
			url: '',
			technologies: [],
		}
		this.imgPath = ''
		this.imgTech = ''
	}

	protected onClickEn() {
		this.projects = {
			id: '',
			key: '',
			title: '',
			hide: false,
			detail: [],
		}
		this.loadData('en')
	}

	protected onClickEs() {
		this.projects = {
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
			.saveImage('image/projects/', $event)
			.then(async (rs) => {
				this.projectsDetail.imagePath = await getDownloadURL(rs.ref)
				this.imgPath = this.projectsDetail.imagePath
			})
			.catch((err) => console.log(err))
	}

	protected uploadTechnologies($event: any) {
		this.storageService
			.saveImage('svg/skills/', $event)
			.then(async (rs) => {
				let img = await getDownloadURL(rs.ref)
				this.projectsDetail.technologies.push(img)
				if (!this.imgTech) {
					this.imgTech = img
				} else {
					this.imgTech += `|${img}`
				}
				this.projectsDetail.technologiesStr = this.imgTech
			})
			.catch((err) => console.log(err))
	}

	protected edit(index: number) {
		this.projectsDetail = this.projects.detail.find(
			(x) => x.index == index
		) as ProjectsDetail
		if (this.projectsDetail.technologies) {
			this.projectsDetail.technologies.forEach((element, index) => {
				if (index == 0) {
					this.projectsDetail.technologiesStr += element
				} else {
					this.projectsDetail.technologiesStr += `|${element}`
				}
			})
		} else {
			this.projectsDetail.technologies = []
		}
		this.formProjects = new FormGroup({
			index: new FormControl(this.projectsDetail.index),
			name: new FormControl(this.projectsDetail.name),
			imagePath: new FormControl(this.projectsDetail.imagePath),
			url: new FormControl(this.projectsDetail.url),
			technologies: new FormControl(this.projectsDetail.technologiesStr),
		})
		this.imgPath = this.projectsDetail.imagePath

		this.formProjects.get('imagePath')?.disable()
		this.formProjects.get('technologies')?.disable()

		this.filePrjUploader.nativeElement.value = null;
		this.fileTchUploader.nativeElement.value = null;
		
		this.formModal.show()
	}

	protected delete(index: number) {
		let exp = this.projects.detail.find(
			(x) => x.index == index
		) as ProjectsDetail
		let pos = this.projects.detail.indexOf(exp)
		this.projects.detail.splice(pos, 1)
		this.portafolioService.updateProjects(this.projects)
	}

	protected onSubmit() {
		this.projects = {
			id: this.projects.id ? this.projects.id : '',
			key: this.lang,
			title: this.form.value.title,
			hide: this.projects.hide,
			detail: this.projects.detail ? this.projects.detail : [],
		}

		if (this.projects.id) {
			this.portafolioService.updateProjects(this.projects)
		} else {
			this.portafolioService.createProjects(this.projects)
		}
	}

	protected onSubmitProjects() {
		let exp = this.projects.detail.find(
			(x) => x.index == this.projectsDetail.index
		) as ProjectsDetail

		if (exp) {
			let index = this.projects.detail.indexOf(exp)
			this.projects.detail[index].index = this.formProjects.value.index
			this.projects.detail[index].name = this.formProjects.value.name
			this.projects.detail[index].imagePath = this.imgPath
			this.projects.detail[index].url = this.formProjects.value.url
			this.projects.detail[index].technologies =
				this.projectsDetail.technologies
			this.projects.detail[index].technologiesStr = ''

			this.portafolioService.updateProjects(this.projects)
		} else {
			this.projectsDetail = {
				index: this.formProjects.value.index,
				name: this.formProjects.value.name,
				imagePath: this.imgPath,
				url: this.formProjects.value.url,
				technologies: this.projectsDetail.technologies,
				technologiesStr: '',
			}
			this.projects.detail.push(this.projectsDetail)
			this.projects.detail = this.projects.detail.sort((one, two) =>
				one.index > two.index ? -1 : 1
			)

			this.portafolioService.updateProjects(this.projects)
		}

		this.filePrjUploader.nativeElement.value = null;
		this.fileTchUploader.nativeElement.value = null;

		this.closeModal()
	}

	protected openModal() {
		this.formProjects = new FormGroup({
			index: new FormControl(''),
			name: new FormControl(''),
			imagePath: new FormControl(''),
			url: new FormControl(''),
			technologies: new FormControl(''),
		})
		this.formProjects.get('imagePath')?.disable()
		this.formProjects.get('technologies')?.disable()
		this.projectsDetail = {
			index: 0,
			name: '',
			imagePath: '',
			url: '',
			technologies: [],
		}
		this.formModal.show()
	}

	protected closeModal() {
		this.formModal.hide()

		this.formProjects = new FormGroup({
			index: new FormControl(''),
			name: new FormControl(''),
			imagePath: new FormControl(''),
			url: new FormControl(''),
			technologies: new FormControl(''),
		})
		this.projectsDetail = {
			index: 0,
			name: '',
			imagePath: '',
			url: '',
			technologies: [],
		}
	}
}
