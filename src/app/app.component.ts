import { Component } from '@angular/core';
import { calculate } from './optimizer';
import { state, saveState } from './state';
import { producerTypes, ProducerType, producerNames, CraftInfo } from './crafts';
import { moduleNames } from './modules';
import { sciencePackNames } from './res';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor() {
    this.update();
  }

  state = state;
  producerTypes = producerTypes;
  moduleNames = moduleNames;
  sciencePackNames = sciencePackNames;
  crafts: ReturnType<typeof calculate>;

  producerNames(type: ProducerType) {
    return producerNames(type);
  }

  update() {
    saveState();
    this.crafts = calculate();
  }

  byProduct(index: any, item: any) {
    return item.product;
  }
}