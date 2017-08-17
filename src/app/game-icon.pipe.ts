import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameIcon'
})
export class GameIconPipe implements PipeTransform {

  transform(value: number): string {
    let retVal : string = ' ';
    switch(value) {
       case -1: {
          retVal = 'O';
          break;
       }
       case 1: {
          retVal = 'X';
          break;
       }
       default: {
          retVal = ' ';
          break;
       }
    }
    return retVal;
  }

}
