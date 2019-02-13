import React, { Component } from 'react';
import dragonballs from './dragonballs.jpg';
import './App.css';
import PicCard from "./components/picCards/picCards.js";
import Container from "./components/Container/Container.js";
import cards from "./cards.json";


class App extends Component {
  // Setting this.state.cards 
  state = {
    cards,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: ""
   };
  clickPicture = id => {
    // this randomly shows the cards
    const shuffledArray = this.shuffleArray(cards);
    this.setState({cards: shuffledArray});
    // if user clicks an image that has already been clicked the score state is set to 0 and the clickeadArray is emptied
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Oh no you clicked a character more than once. You've been hit by a Kamahamaha Wave! Game Over!  To start over click an image!" });
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "Correct!!"
      
      });
    }
    // if the current score is greater than the the topscore it changes the topscore to the current score.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
    // if you click all the images without a duplicate show Congratulations message and reset state values
    if (this.state.score===12) {
      this.setState({ 
        clickedArray: [],
        topScore: 0,
        score:0,
        message: "Congratulations! You Won! Click an image to have another go!" });
    }

  }
  shuffleArray = (picArray) => {
      for (let i = picArray.length - 1; i > 0; i--) {
          const randompic = Math.floor(Math.random() * (i + 1));
          [picArray[i], picArray[randompic]] = [picArray[randompic], picArray[i]];
      }
      return picArray;
  }
  render() {
    return (
      <div className="App">
        <header className="header">
          <img src={dragonballs} className="logo" alt="logo" />
          
          <h1 className="title">Dragon Ball Clicky Picture Game!!</h1>
        </header>
        <h3 className="instructions">
          <strong>To start click any image. Each image clicked will earn you one point, but don't click on any, more than once or it's <i>Game Over!</i></strong> 
          <p className = "score"><strong>Score: {this.state.score} || TopScore: {this.state.topScore}</strong></p>
          <p className="message"><strong>{this.state.message}</strong></p>
        </h3>
        <Container
             pictures=
          {this.state.cards.map(picture => (
            <PicCard
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id} 
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
       
      </div>
    );
  }
}

export default App;
