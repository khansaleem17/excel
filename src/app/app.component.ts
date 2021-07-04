import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, combineAll } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  rows:any[] = [];
  cols:any[] = [];
  model = {};

  constructor() {
  }
  ngOnInit() {
   for (let index = 0; index < 10; index++) {
     this.rows.push(index);
     this.cols.push(index);
   }
  }
assignvalue(row,col,ev){
  const key = this.getKey(row,col);
  const value = ev.target.value;
  if(!isNaN(value)){
  this.model[key] = {
    value:ev.target.value ? parseFloat(ev.target.value) : null,
    col:col,
    row:row
  };
  }
};

calculateSum(row,col,ev){
  const key = this.getKey(row,col);
  const value:String = ev.target.value;
   if(value.toLowerCase().includes('=')){
    let strArray = value.split(',');
   strArray = strArray.map(s => {
      s = s.trim();
      if( s.includes('=')) {
       s = s.replace('=','');
      }
      return s;
    })
    console.log(strArray);
    let selectedRows = [];
    strArray.forEach(k => {
      let row = this.model[this.getKey(k,col)];
      selectedRows.push(row);
    });
   let sum = (selectedRows.map(x => x.value)).reduce((acc,curr) => {
    return acc + curr
   },0);
   console.log(sum);
    ev.target.value = sum;
    this.model[key] = {
      value:sum,
      col:col,
      row:row
    };
    console.log(sum);
  }
}

getKey(row,col){
return `col_${col}_row_${row}`
}
}
