import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import {NgClass, NgStyle, UpperCasePipe, DatePipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    DatePipe
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})

export class SingleFaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;

  snapButtonText!: string;
  userHasSnapped!: boolean;
  router: any;

  constructor(private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.prepareInterface();
    this.getFaceSnap();
  }
  
  private prepareInterface() {
    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }

  private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
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