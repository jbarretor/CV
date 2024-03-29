import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from 'src/app/components/cv/cv.component';

const routes: Routes = [
    { path: '', component: CvComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PortfolioRoutingModule {}
