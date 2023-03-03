import { Injectable } from '@angular/core';
import { Firestore, collectionData, addDoc, doc, setDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { AboutMe } from '../interfaces/about-me';
import { Contact } from '../interfaces/contact';
import { ContactForm } from '../interfaces/contact-form';
import { Education } from '../interfaces/education';
import { Experience } from '../interfaces/experience';
import { Header } from '../interfaces/header';
import { Language } from '../interfaces/language';
import { Skills } from '../interfaces/skills';
import { SocialNetwork } from '../interfaces/social-network';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  constructor(private firestore: Firestore) { }
  //#region Header
  createHeader(experience: Header) {
    const portRef = collection(this.firestore, 'Experience')

    return addDoc(portRef, experience)
  }

  readHeader(): Observable<Header[]> {
    const portRef = collection(this.firestore, 'Header')

    return collectionData(portRef, { idField: 'id' }) as Observable<Header[]>;
  }

  updateHeader(header: Header) {
    const portRef = doc(this.firestore, 'Header/' + header.id)
    return setDoc(portRef, header)
  }

  deleteHeader(header: Header) {
    const portRef = doc(this.firestore, 'Header/' + header.id)

    return deleteDoc(portRef);
  }
  //#endregion

  //#region AboutMe
  createAboutMe(aboutMe: AboutMe) {
    const portRef = collection(this.firestore, 'AboutMe')

    return addDoc(portRef, aboutMe);
  }

  readAboutMe(): Observable<AboutMe[]> {
    const portRef = collection(this.firestore, 'AboutMe')

    return collectionData(portRef, { idField: 'id' }) as Observable<AboutMe[]>;
  }

  updateAboutMe(aboutMe: AboutMe) {
    const portRef = doc(this.firestore, 'AboutMe/' + aboutMe.id)
    
    return setDoc(portRef, aboutMe)
  }

  deleteAboutMe(aboutMe: AboutMe) {
    const portRef = doc(this.firestore, 'AboutMe/' + aboutMe.id)

    return deleteDoc(portRef);
  }
  //#endregion AboutMe

  //#region Experience
  createExperience(experience: Experience) {
    const portRef = collection(this.firestore, 'Experience')
    let save = {
      key: experience.key,
      title: experience.title,
      detail: experience.detail ? experience.detail : null
    }
    return addDoc(portRef, experience);
  }

  readExperience(): Observable<Experience[]> {
    const portRef = collection(this.firestore, 'Experience')

    return collectionData(portRef, { idField: 'id' }) as Observable<Experience[]>;
  }

  updateExperience(experience: Experience) {
    const portRef = doc(this.firestore, 'Experience/' + experience.id)
    return setDoc(portRef, experience)
  }

  deleteExperience(experience: Experience) {
    const portRef = doc(this.firestore, 'Experience/' + experience.id)

    return deleteDoc(portRef);
  }
  //#endregion Experience

  //#region Education
  createEducation(education: Education) {
    const portRef = collection(this.firestore, 'Education')

    return addDoc(portRef, education);
  }

  readEducation(): Observable<Education[]> {
    const portRef = collection(this.firestore, 'Education')

    return collectionData(portRef, { idField: 'id' }) as Observable<Education[]>;
  }

  updateEducation(education: Education) {
    const portRef = doc(this.firestore, 'Education/' + education.id)
    return setDoc(portRef, education)
  }

  deleteEducation(education: Skills) {
    const portRef = doc(this.firestore, 'Education/' + education.id)

    return deleteDoc(portRef);
  }
  //#endregion Education

  //#region Skills
  createSkills(skills: Skills) {
    const portRef = collection(this.firestore, 'Skills')

    return addDoc(portRef, skills);
  }

  readSkills(): Observable<Skills[]> {
    const portRef = collection(this.firestore, 'Skills')

    return collectionData(portRef, { idField: 'id' }) as Observable<Skills[]>;
  }

  updateSkills(skills: Skills) {
    const portRef = doc(this.firestore, 'Skills/' + skills.id)
    return setDoc(portRef, skills)
  }

  deleteSkills(skills: Skills) {
    const portRef = doc(this.firestore, 'Skills/' + skills.id)

    return deleteDoc(portRef);
  }
  //#endregion Skills

  //#region Language
  createLanguage(language: Language) {
    const portRef = collection(this.firestore, 'LanguageLevel')

    return addDoc(portRef, language);
  }

  readLanguage(): Observable<Language[]> {
    const portRef = collection(this.firestore, 'LanguageLevel')

    return collectionData(portRef, { idField: 'id' }) as Observable<Language[]>;
  }

  updateLanguage(language: Language) {
    const portRef = doc(this.firestore, 'LanguageLevel/' + language.id)
    return setDoc(portRef, language)
  }

  deleteLanguage(language: Language) {
    const portRef = doc(this.firestore, 'LanguageLevel/' + language.id)

    return deleteDoc(portRef);
  }
  //#endregion Language

  //#region SocialNetwork
  createSocialNetwork(socialNetwork: SocialNetwork) {
    const portRef = collection(this.firestore, 'SocialNetwork')

    return addDoc(portRef, socialNetwork);
  }

  readSocialNetwork(): Observable<SocialNetwork[]> {
    const portRef = collection(this.firestore, 'SocialNetwork')

    return collectionData(portRef, { idField: 'id' }) as Observable<SocialNetwork[]>;
  }

  updateSocialNetwork(socialNetwork: SocialNetwork) {
    const portRef = doc(this.firestore, 'SocialNetwork/' + socialNetwork.id)
    return setDoc(portRef, socialNetwork)
  }

  deleteSocialNetwork(socialNetwork: SocialNetwork) {
    const portRef = doc(this.firestore, 'SocialNetwork/' + socialNetwork.id)

    return deleteDoc(portRef);
  }
  //#endregion SocialNetwork

  //#region Contact
  createContact(contact: Contact) {
    const portRef = collection(this.firestore, 'Contact')

    return addDoc(portRef, contact);
  }

  readContact(): Observable<Contact[]> {
    const portRef = collection(this.firestore, 'Contact')

    return collectionData(portRef, { idField: 'id' }) as Observable<Contact[]>;
  }

  updateContact(contact: Contact) {
    const portRef = doc(this.firestore, 'Contact/' + contact.id)
    return setDoc(portRef, contact)
  }

  deleteContact(contact: Contact) {
    const portRef = doc(this.firestore, 'Contact/' + contact.id)

    return deleteDoc(portRef);
  }
  //#endregion Contact

  //#region Caida Contacto
  createContactForm(contactForm: ContactForm) {
    const portRef = collection(this.firestore, 'ContactForm')

    return addDoc(portRef, contactForm);
  }
  //#endregion Caida Contacto
}
