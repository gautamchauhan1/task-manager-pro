import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObsOperatorsComponent } from './features/rxjs-learning/obs-operators/obs-operators.component';
import { MapFilterComponent } from './features/rxjs-learning/map-filter/map-filter.component';
import { SubBehsubComponent } from './features/rxjs-learning/sub-behsub/sub-behsub.component';
import { LifecycleHooksComponent } from './features/lifecycle-hooks/lifecycle-hooks.component';
import { MergeConcatSwitchMapComponent } from './features/rxjs-learning/merge-concat-switch-map/merge-concat-switch-map.component';
import { HomeworkTaskComponent } from './features/homework-task/homework-task.component';
import { CrudAppComponent } from './features/crud-app/crud-app/crud-app.component';

const routes: Routes = [
  {path:'rxjs-operators', component: ObsOperatorsComponent},
  {path:'map-filter', component: MapFilterComponent},
  {path: 'subjects', component: SubBehsubComponent},
  {path:'lifecyclehooks', component: LifecycleHooksComponent},
  {path: 'maps', component: MergeConcatSwitchMapComponent},
  {path: 'homework-task', component: HomeworkTaskComponent},
  {path: 'master-crud', component: CrudAppComponent},
  {path:'', redirectTo: '/operators', pathMatch: 'full'} // Default page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
