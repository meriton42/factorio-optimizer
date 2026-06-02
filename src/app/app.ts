import { Component } from '@angular/core';
import { calculate } from './optimizer';
import { state, saveState } from './state';
import { producerTypes, producerNames } from './producer';
import { moduleNames } from './modules';
import { resNames, sciencePackNames } from './res';
import { FormsModule } from '@angular/forms';
import { WikiLink } from './wiki-link';
import { DecamelizePipe } from './pipes';

@Component({
  selector: 'app-root',
  imports: [ FormsModule, DecamelizePipe, WikiLink ],
  templateUrl: './app.html',
})
export class App {

  constructor() {
    this.update();
  }

  state = state;
  producerTypes = producerTypes;
  moduleNames = moduleNames;
  resNames = resNames;
  sciencePackNames = sciencePackNames;
  crafts!: ReturnType<typeof calculate>;

  preferredProducer = state.preferredProducer as Record<string, string>; // work around type checking limitations in angular templates

  producerNames = producerNames;

  update() {
    saveState();
    this.crafts = calculate();
  }
}