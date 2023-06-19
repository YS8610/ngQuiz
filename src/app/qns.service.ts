import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ans, Question } from './question.model';
// import rttQn1 from '../../assets/rttQn1.json';

@Injectable({
  providedIn: 'root'
})
export class QnsService {

  // URL_RTT = "../assets/rttQn";
  URL_RTT = "./assets/rttQn";

  constructor(
    private http: HttpClient
  ) { }

  getRttQn(no:number){
    console.log(this.URL_RTT+no+".json")
    return this.http.get<Question[]>(this.URL_RTT+no+".json");
  }


}
