import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { SnapType } from '../models/snap-type.type';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {
    private FaceSnaps: FaceSnap[] = [
        new FaceSnap(
          'Archibald',
          new Date(),
          'Mon meilleur ami depuis tout petit !',
          'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
          3
        ),
        new FaceSnap(
          'Thomas',
          new Date(),
          'Concert de The Weeknd !',
          'https://images.rtl.fr/~c/2000v2000/funradio/www/1526747-the-weeknd-lors-de-son-concert-au-met-life-stadium.jpg',
          492
        ).withLocation('Stade de France'),
        new FaceSnap(
          'Stine',
          new Date(),
          'WOOOOW !',
          'https://www.flarkenadventure.com/wp-content/uploads/2021/07/aurore-boreales-suede-laponie-flarken-adventure-1920x1200.jpg',
          128
        ).withLocation('A la montagne')
    ]; 


    getFaceSnaps(): FaceSnap[] {
        return[...this.FaceSnaps]
    }

    /*
    snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
        const foundFaceSnap = this.FaceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        if (!foundFaceSnap) {
          throw new Error('FaceSnap not found!');
        }
        foundFaceSnap.snap(snapType);
    }*/

    getFaceSnapById(faceSnapId: string): FaceSnap {
      const foundFaceSnap = this.FaceSnaps.find((faceSnap: { id: string; }) => faceSnap.id === faceSnapId);
      if (!foundFaceSnap) {
        throw new Error('FaceSnap not found!');
      }
      return foundFaceSnap;
    }
  
    snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
      const faceSnap = this.getFaceSnapById(faceSnapId);
      faceSnap.snap(snapType);
    }
}


