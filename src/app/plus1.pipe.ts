import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plus1'
})
export class Plus1Pipe implements PipeTransform {

  transform(value: number[], plus:number): number[] {
    let val : number[]=[];
    for ( let i of value){
      val.push(i+plus)
    }
    return val;
  }

}
