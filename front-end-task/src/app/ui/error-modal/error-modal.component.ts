import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {

  public isVisible = true;
  constructor() { }

  public onCloseClick() {
    this.isVisible = false;
  }

}

