import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { CComponent } from './components/c/c.component';
import { DComponent } from './components/d/d.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'a' },
      { path: 'a', component: AComponent },
      { path: 'b', component: BComponent },
      { path: 'c', component: CComponent },
      { path: 'd', component: DComponent },
      { path: '**', redirectTo: 'a' },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
