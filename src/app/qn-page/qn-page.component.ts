import { Component, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { QnsService } from '../qns.service';
import { Ans, Question } from '../question.model';

@Component({
  selector: 'app-qn-page',
  templateUrl: './qn-page.component.html',
  styleUrls: ['./qn-page.component.css']
})
export class QnPageComponent implements OnInit {

  qnlist : Question[] =[];
  test = ""; // for path parameter
  testno=0; // for path parameter
  qnNo = 0; // variable for the page to be at
  notFound=false; // error for not finding path
  ansObj : Ans[] = []; // store the ans from user
  ans = ""; // for ngmodel 2 way binding
  qnCompleted = 0;
  allDoneExceptLastqn = false; // one of the condition for submit to be valid
  allDone = false; // to get a submit button to appear after all answer is in
  isSubmitted = false;
  correctQnNo : number[] =[];
  wrongQnNo : number[]=[];
  showAns = false; // to toggle show all answer



  constructor(
    private qns : QnsService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.test = this.route.snapshot.params["test"];
    this.testno = this.route.snapshot.params["number"] as number;
    if (this.test==="rtt" && this.testno>0){
      this.qns.getRttQn(this.testno)
      .subscribe( {
        next : resp =>{
          this.notFound = false;
          resp.forEach(q => this.shuffleArray(q.options))
          this.shuffleArray(resp);
          this.qnlist = resp;
          // creating ansObj
          let no = 0;
          this.qnlist.forEach( qn =>{
            let ansval=-1;
            for (let i=0; i<qn.options.length;i++ ){
              if (qn.options[i].isAns){
                ansval = i;
                break
              }
            }
            this.ansObj.push({ qnno : no , id : +qn.id, ans: this.ans, correctans : ansval})
            no++;
          })
        },
        error : error => {this.notFound = true;}
      });
    }
  }


  onNext(){
    this.saveAnsObjValue(this.qnNo,this.ans);
    this.qnNo = this.qnNo<this.qnlist.length-1? this.qnNo+1 : this.qnNo;
    this.ans = this.getAnsObjValue(this.qnNo);
    // console.log(this.ansObj)
    this.qnCompleted = this.getCompletedNo();
    this.allDoneExceptLastqn=this.getAllDoneExceptLastqn();
    this.allDone = this.getAllDone();
  }

  onBack(){
    this.saveAnsObjValue(this.qnNo,this.ans);
    this.qnNo = this.qnNo>0? this.qnNo-1:this.qnNo;
    this.ans = this.getAnsObjValue(this.qnNo);
    this.qnCompleted = this.getCompletedNo();
    this.allDoneExceptLastqn=this.getAllDoneExceptLastqn();
    this.allDone = this.getAllDone();

  }

  onChange(e:HTMLSelectElement){//Matselect
    // console.log(e)
    this.saveAnsObjValue(this.qnNo,this.ans);
    this.qnNo = +e.value;
    this.ans = this.getAnsObjValue(this.qnNo);
    this.qnCompleted = this.getCompletedNo();
    this.allDoneExceptLastqn=this.getAllDoneExceptLastqn();
    this.allDone = this.getAllDone();
  }

  onSubmit(){
    // console.log(this.quizForm);
    this.saveAnsObjValue(this.qnNo,this.ans);
    this.qnCompleted = this.getCompletedNo();
    this.isSubmitted = true;
    for (let i of this.ansObj){
      if( i.ans === i.correctans ){
        this.correctQnNo.push(i.qnno);
      }else{
        this.wrongQnNo.push(i.qnno);
      }
    }

  }

  onShowAns(){
    this.showAns = this.showAns ? false : true ;
  }

  onHomePg(){
    this.router.navigate(["/"]);
  }


  private shuffleArray<T>(array:T[]){
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  private saveAnsObjValue(qnno:number,ansgiven:string){
    if (ansgiven === ""){
      this.ansObj[qnno].ans = "";
    }else{
      this.ansObj[qnno].ans = +ansgiven
    }
  }

  private getAnsObjValue(qnno:number):string{
    return this.ansObj[qnno].ans+"";
  }

  private getCompletedNo():number{
    let j=0;
    for (let i =0; i<this.ansObj.length; i++){
      if (typeof this.ansObj[i].ans == "number" ){j++}
    }
    return j;
  }

  private getAllDoneExceptLastqn():boolean{
    let j =true;
    for (let i=0; i < this.ansObj.length-1; i++ ){
      if(typeof this.ansObj[i].ans == "string"){ j=false;}
    }
    return j;
  }

  private getAllDone():boolean{
    let j =true;
    for (let i=0; i < this.ansObj.length; i++ ){
      if(typeof this.ansObj[i].ans == "string"){ j=false;}
    }
    return j;
  }
}
