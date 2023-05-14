import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from 'src/app/components/administrator/administrator.component';
import { LoginComponent } from 'src/app/components/administrator/login/login.component';
import { ManagerComponent } from 'src/app/components/administrator/manager/manager.component';
import { AboutMeManagerComponent } from 'src/app/components/administrator/manager/about-me-manager/about-me-manager.component';
import { EducationManagerComponent } from 'src/app/components/administrator/manager/education-manager/education-manager.component';
import { ExperienceManagerComponent } from 'src/app/components/administrator/manager/experience-manager/experience-manager.component';
import { LanguageManagerComponent } from 'src/app/components/administrator/manager/language-level-manager/language-level-manager.component';
import { ProjectsManagerComponent } from 'src/app/components/administrator/manager/projects-manager/projects-manager.component';
import { SkillsManagerComponent } from 'src/app/components/administrator/manager/skills-manager/skills-manager.component';
import { SocialManagerComponent } from 'src/app/components/administrator/manager/social-manager/social-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AdministratorComponent,
    LoginComponent,
    ManagerComponent,
    AboutMeManagerComponent,
    EducationManagerComponent,
    ExperienceManagerComponent,
    LanguageManagerComponent,
    ProjectsManagerComponent,
    SkillsManagerComponent,
    SocialManagerComponent,
  ],
  imports: [
    FormsModule,
		ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()),
    CommonModule, 
    AdministratorRoutingModule,
  ],
  exports: [
    AdministratorComponent
  ]
})
export class AdministratorModule {}
