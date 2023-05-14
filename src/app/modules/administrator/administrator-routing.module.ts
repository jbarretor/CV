import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from 'src/app/components/administrator/administrator.component';
import { LoginComponent } from 'src/app/components/administrator/login/login.component';
import { ManagerComponent } from 'src/app/components/administrator/manager/manager.component';

const routes: Routes = [
	{
		path: 'sdfsre3f54asefaa5',
		component: AdministratorComponent,
		children: [
			{ 
				path: '', 
				component: LoginComponent,
				...canActivate(() => redirectLoggedInTo('/sdfsre3f54asefaa5/Manager')),
			},
			{
				path: 'Manager',
				component: ManagerComponent,
				...canActivate(() => redirectUnauthorizedTo('/sdfsre3f54asefaa5')),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdministratorRoutingModule { }
