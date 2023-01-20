import { Component } from '@angular/core';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'electron-api-test';

  private ipc?: IpcRenderer
  electronApp = false
  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
        this.electronApp = true

        this.ipc?.on('open-signal', (event, arg) => {
          console.log('Signal received: ', event)
          console.log('Args: ', arg)
        })
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
  }

  openModal(){
    console.log("Open a modal");
    this.ipc?.send("openModal");
  }
}
