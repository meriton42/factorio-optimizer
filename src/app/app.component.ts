import { Component } from '@angular/core';
import { calculate } from './optimizer';
import { state, saveState } from './state';
import { producerTypes, ProducerType, producerNames } from './crafts';

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
  crafts: ReturnType<typeof calculate>;

  producerNames(type: ProducerType) {
    return producerNames(type);
  }

  update() {
    saveState();
    this.crafts = calculate();
  }
}