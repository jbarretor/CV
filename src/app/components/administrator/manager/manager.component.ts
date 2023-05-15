import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@services/auth'

@Component({
	selector: 'app-manager',
	templateUrl: './manager.component.html',
	styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
	constructor(private auth: AuthService, private router: Router) {}

	ngOnInit(): void {}

	onClick() {
		this.auth
			.logout()
			.then(() => {
				this.router.navigate(['/sdfsre3f54asefaa5'])
			})
			.catch((err) => console.log(err))
	}
}
