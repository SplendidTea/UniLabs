import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

class App extends Component {
    //inital state
    state={
    rows:6,
    columns:7,
    moves:[],
    playerTurn: 'red',
    winner: ''
    };

    //resets the board and winner
    resetB=()=>{
        this.setState({moves: [],
                            winner:null});
    }


getToken=(x,y) =>{
    const list=this.state.moves.filter((item)=> {
        return (item.x === x && item.y == y);
    });
    return list[0];
}

//checks for a winner in the vertical and horizontal direction
checkForWin=(x,y,player)=>{

    let winningmove=[{x,y}];
        for(let column=x+1; column<x+4;column+=1)
    {
        const checkToken=this.getToken(column,y);
        if(checkToken&&checkToken.player==player)
        {
            //pushes using x and y keys to winning move
            winningmove.push({x: column,y:y});
        }
        else{
            break;
        }
    }
    for(let column=x-1; column>x-4;column-=1)
    {
        const checkToken=this.getToken(column,y);
        if(checkToken&&checkToken.player==player)
        {
            winningmove.push({x: column,y:y});
        }
        else{
            break;
        }
    }
    //if winning move is greater than 3 it makes the current player the winner
if(winningmove.length>3){
    this.setState({winner:player, winningmove});
    return true;
}

//same as above but for the vertical
     winningmove=[{x,y}];
    for(let row=y+1; row<y+4;row+=1)
    {
        const checkToken=this.getToken(x, row);
        if(checkToken&&checkToken.player==player)
        {
            winningmove.push({x:x, y:row});
        }
        else{
            break;
        }
    }
    for(let row=y-1; row>y-4;row-=1)
    {
        const checkToken=this.getToken(x, row);
        if(checkToken&&checkToken.player==player)
        {
            winningmove.push({x:x, y:row});
        }
        else{
            break;
        }
    }
    if(winningmove.length>3){
        this.setState({winner:player, winningmove});
        return true;
    }

}

//sets the token to red or blue and afterwards checks for a winner
addMove=(x,y)=>{
const {playerTurn}=this.state;
        const nextPlayerTurn=playerTurn==='red' ? 'blue': 'red'
        this.setState({moves:this.state.moves.concat({x,y,player:playerTurn}), playerTurn:nextPlayerTurn } ,()=>this.checkForWin(x,y, playerTurn));
}
//the framework of the board
    boardRender()
    {
        const {rows,columns, winner}=this.state;
        const rowViews=[];

        for(let row=0; row<this.state.rows; row+=1){
            const colv=[];
            for(let col=0; col<this.state.columns; col+=1){
const token=this.getToken(col,row);
                colv.push( //on click adds the token to the proper slot, also sets the background of the columns to white
    <div onClick={()=>{this.addMove(col, row)}} style={{width: 100, height: 100, backgroundColor: 'white', border: '1px solid #333', cursor:'pointer'}}>
        {token ? <div style={{width: 100, height: 100,backgroundColor: token.player, flex: 1}} />: undefined }

    </div>
)
            }
            //pushes to the row array
            rowViews.push(
<div style={{display: 'flex', flexDirection: 'row'}}>{colv}</div>

            )
        }
        return( //when winner sets an overlay of whoever one and makes it clickable to reset board
            <div style={{backgroundColor: 'red', display: 'flex', flexDirection:'column'}}>
                {winner && <div onClick={this.resetB} style={{position: 'absolute', left:0,right:0,bottom:0,top:0,  backgroundColor: 'rgba(0,100,0,.2)'}}>{`${winner} Won`}</div>}
                {rowViews}

            </div>


        )


    }



  render()
  {
const {style} =this.props;
//renders the board proper
      return (
      <div style={style ? Object.assign({}, styles.container,style):styles.container}>
          <div>
              {this.boardRender()}

          </div>

      </div>



  );}

}

const styles={
    container:{
        padding:5,
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    }


}


export default App;
