import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PortfolioModule } from './modules/portfolio/portfolio.module'
import { AdministratorModule } from './modules/administrator/administrator.module'

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		PortfolioModule,
		AdministratorModule,
		BrowserModule,
		AppRoutingModule,
		RouterModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
