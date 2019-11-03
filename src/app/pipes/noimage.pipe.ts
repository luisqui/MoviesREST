import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(images: string): string {
//console.log("imagen1 "+images);
    if (!(images === "noimage")) {
      return images;
    } else {
      return 'assets/img/noimage.png';
    }
  }

}
