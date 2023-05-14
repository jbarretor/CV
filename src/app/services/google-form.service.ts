import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Injectable({
	providedIn: 'root',
})
export class GoogleFormService {
	constructor(private http: HttpClient) {}

	SendForm(data: FormGroup) {
		let date: Date = new Date()
		this.http
			.post(
				'https://docs.google.com//forms/d/e/1FAIpQLScB_5VjscAh1FPvbGOh174IWR2m8GaGUA0QBDa8LeHqsEYeQQ/formResponse',
				{},
				{
					responseType: 'arraybuffer',
					params: {
						'entry.1221108986_year': date.getFullYear().toString(),
						'entry.1221108986_month': (date.getMonth() + 1).toString(),
						'entry.1221108986_day': date.getDate().toString(),
						'entry.192254487': data.value.name,
						'entry.1584335658': data.value.email,
						'entry.324243063': data.value.phone,
						'entry.548951854': data.value.message,
					},
				}
			)
			.subscribe({
				next: (data) => {
					console.log('exitoso', data)
				},
				error: (error) => {
					// this.errorMessage = error.message;
					console.log('There was an error!', error)
				},
			})
	}
}
