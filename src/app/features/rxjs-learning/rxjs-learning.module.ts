import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubBehsubComponent } from './sub-behsub/sub-behsub.component';
import { ObsOperatorsComponent } from './obs-operators/obs-operators.component';
import { MapFilterComponent } from './map-filter/map-filter.component';
import { FormsModule } from '@angular/forms';
import { MergeConcatSwitchMapComponent } from './merge-concat-switch-map/merge-concat-switch-map.component';



@NgModule({
  declarations: [
    SubBehsubComponent,
    ObsOperatorsComponent,
    MapFilterComponent,
    MergeConcatSwitchMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    SubBehsubComponent,
    ObsOperatorsComponent,
    MapFilterComponent
  ]
})
export class RxjsLearningModule { }
