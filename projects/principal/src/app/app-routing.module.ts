import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { LoginComponent } from './login/login.component';
import { DirectComponent } from './direct/direct.component';
import { DirectMensagensComponent } from './direct/direct-mensagens/direct-mensagens.component';

const routes: Routes = [{ path: '', component: TimelineComponent   },
{ path: 'login', component: LoginComponent },
{ path: 'direct/:id', component: DirectMensagensComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
