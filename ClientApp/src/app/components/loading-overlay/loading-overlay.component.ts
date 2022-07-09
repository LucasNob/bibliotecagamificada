import { Component, OnInit } from '@angular/core';
import { LoadingOverlayService } from 'src/app/services/loading-overlay.service';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {

  constructor(
    public service: LoadingOverlayService
  ) { }


  ngOnInit(): void {
  }



}




