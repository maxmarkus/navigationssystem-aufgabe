import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { CComponent } from './components/c/c.component';
import { DComponent } from './components/d/d.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'a', pathMatch: 'full' },
      { path: 'a', component: AComponent },
      { path: 'b', component: BComponent },
      { path: 'c', component: CComponent },
      { path: 'd', component: DComponent },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
