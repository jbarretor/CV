import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvComponent } from 'src/app/components/cv/cv.component';
import { AboutMeComponent } from 'src/app/components/cv/about-me/about-me.component';
import { ContactComponent } from 'src/app/components/cv/contact/contact.component';
import { EducationComponent } from 'src/app/components/cv/education/education.component';
import { ExperienceComponent } from 'src/app/components/cv/experience/experience.component';
import { HeaderComponent } from 'src/app/components/cv/header/header.component';
import { LanguageLevelComponent } from 'src/app/components/cv/language-level/language-level.component';
import { ProjectsComponent } from 'src/app/components/cv/projects/projects.component';
import { SkillsComponent } from 'src/app/components/cv/skills/skills.component';
import { SocialComponent } from 'src/app/components/cv/social/social.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';



@NgModule({
  declarations: [
    CvComponent,
		HeaderComponent,
		AboutMeComponent,
		ExperienceComponent,
		ProjectsComponent,
		EducationComponent,
		SkillsComponent,
		LanguageLevelComponent,
		SocialComponent,
		ContactComponent,
  ],
  imports: [
    FormsModule,
		ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(() => getFirestore()),
    CommonModule,
    PortfolioRoutingModule,
  ],
  exports: [
    CvComponent
  ]
})
export class PortfolioModule { }
