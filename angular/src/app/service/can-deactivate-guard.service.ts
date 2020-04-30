import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { TablegameComponent } from 'src/app/components/tablegame/tablegame.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<TablegameComponent> {

  constructor() { }

  canDeactivate(component: TablegameComponent):boolean {
    if(confirm("If you leave, your connection will be lost! ")) {
      component.disconnect()
      return true;
    } else {
      return false;
    }
  }

}
