export interface Question{
  id:string;
  qn:string;
  test:string;
  options: Option[];
  picture:string;
}


export interface Option{
  content:string;
  isAns:boolean;
}


export interface Ans{
  qnno:number;
  id:number;
  ans:number|string;
  correctans:number;
}
