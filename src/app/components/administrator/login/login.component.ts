import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@services/auth'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	protected form: FormGroup

	constructor(private authService: AuthService, private router: Router) {
		this.form = new FormGroup({
			email: new FormControl(),
			password: new FormControl(),
		})
	}

	ngOnInit(): void {}

	onSubmit() {
		this.authService
			.login(this.form.value)
			.then((rs) => {
				this.router.navigate(['/sdfsre3f54asefaa5/Manager'])
			})
			.catch((err) => console.log(err))
	}
}
