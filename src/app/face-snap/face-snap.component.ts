import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import {NgClass, NgStyle, UpperCasePipe, DatePipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    DatePipe
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})

export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;

  snapButtonText!: string;
  userHasSnapped!: boolean;

  constructor(private faceSnapsService: FaceSnapsService, private router: Router){}

  ngOnInit() {
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }
  
  onSnap(): void {
      if (this.userHasSnapped) {
        this.unSnap();
      } else {
        this.snap();
      }
    }

  unSnap() {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id,'unsnap');
      this.snapButtonText = 'Oh Snap!';
      this.userHasSnapped = false;
  }

  snap() {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id,'snap');
      this.snapButtonText = 'Oops, unSnap!';
      this.userHasSnapped = true;
  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }
}