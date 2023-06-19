import { Pipe, PipeTransform } from '@angular/core';
import { Ans } from './question.model';

@Pipe({
  name: 'notdone',
  pure: false
})
export class NotdonePipe implements PipeTransform {

  transform(val: Ans[]): number[] {
    let notdone :number[] = [];
    for (let i of val){
      if (i.ans === ""){
        notdone.push(i.qnno+1);
      }
    }

    return notdone;
  }

}
