import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact } from '@interface/contact';
import { ContactForm } from '@interface/contact-form';
import { PortafolioService } from '@services/portafolio';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnChanges {
  
  @Input()
  lang: string = ''
  protected contact: Contact
  protected form: FormGroup

  constructor(private portafolioService: PortafolioService) {
    this.contact = {
      id: '',
      key: '',
      title: '',
      hide: true,
      fullnamePlaceHolder: '',
      emailPlaceHolder: '',
      phonePlaceHolder: '',
      messagePlaceHolder: '',
      submitBtnContact: '',
      submitContact: ''
    }

    this.form = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      message: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.portafolioService.readContact().subscribe(contact => {
      let info = contact.find(x => x.key == this.lang)
      if (info) {
        this.contact = info
      }
    });
  }

  ngOnChanges(): void {
    this.portafolioService.readContact().subscribe(contact => {
      let info = contact.find(x => x.key == this.lang)
      if (info) {
        this.contact = info
      }
    });
  }

  protected async onSubmit() {
    let date: Date = new Date()
    let contactForm: ContactForm = {
      date: date.toString(),
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      message: this.form.value.message
    }
    this.portafolioService.createContactForm(contactForm)
    // this.googleFormService.SendForm(this.form)
  }
}
