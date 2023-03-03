import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/interfaces/contact';
import { ContactForm } from 'src/app/interfaces/contact-form';
import { GoogleFormService } from 'src/app/services/google-form.service';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnChanges {
  
  @Input()
  lang: string = ''
  year: string
  month: string
  day: string
  contact: Contact
  form: FormGroup

  constructor(private portafolioService: PortafolioService, private googleFormService: GoogleFormService) {
    let date: Date = new Date()

    this.year = date.getFullYear().toString()
    this.month = (date.getMonth() + 1).toString()
    this.day = date.getDate().toString()

    this.contact = {
      id: '',
      key: '',
      title: '',
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

  async onSubmit() {
    let contactForm: ContactForm = {
      date: this.day + '/' + this.month + '/' + this.year,
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      message: this.form.value.message
    }
    this.portafolioService.createContactForm(contactForm)
    this.googleFormService.SendForm(this.form)
  }
}
