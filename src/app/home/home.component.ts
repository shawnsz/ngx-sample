import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tic-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginWith: string;    // 'O', 'X'
  nextTurn: string;
  stepCount: number;
  gameBoard: number[][];

  constructor() {
    this.gameInit('O');
  }

  ngOnInit() {
  }

  gameInit(bWith: string) {
    this.beginWith = bWith;
    this.nextTurn = bWith;
    this.stepCount = 0;
    this.gameBoard = [[0, 0, 0,], [0, 0, 0], [0, 0, 0]];
  }

  actGeme(iRow: number, iCol: number) {
    if (this.nextTurn === 'O') {
      this.gameBoard[iRow][iCol] = -1;
      this.nextTurn = 'X';
    } else {
      this.gameBoard[iRow][iCol] = 1;
      this.nextTurn = 'O';
    }
    this.stepCount++;
  }

  getGameResult(){
    let rowCheck: number[] = [0,0,0];
    for(let i =0; i<3; i++){
      rowCheck[0] += this.gameBoard[0][i];
      rowCheck[1] += this.gameBoard[1][i];
      rowCheck[1] += this.gameBoard[2][i];
    }

  }

}
