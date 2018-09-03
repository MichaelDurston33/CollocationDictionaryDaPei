import React, { Component } from 'react';
import axios from 'axios';

import classes from './AddCardToDatabase.css';
import Backdrop from '../../Components/UI/Backdrop/Backdrop'
import CardsForDatabase from '../../Components/Cards/CardsForDatabase/CardsForDatabase.js'
import Aux from '../../hoc/Aux'
import backgroundImage from '../../assets/images/chinaBackdrop.jpg'




class AddCardToDatabase extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandlerChinese = this.onChangeHandlerChinese.bind(this);
    this.onChangeHandlerEnglish = this.onChangeHandlerEnglish.bind(this);
    this.onChangeHandlerDate = this.onChangeHandlerHsk.bind(this);
    this.onChangeHandlerPinyin = this.onChangeHandlerPinyin.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.state = {
        chinese: '',
        english: '',
        hsk: '',
        pinyin: '',
        loading: false,
        cards: [],
        cardLength: 0,
      }
  }


//Gets the cards in the database on first load, sets
//the length of the returned object so it can them be used
//in componentDidUpdate.
  componentDidMount() {
    axios.get('https://collocationnet.firebaseio.com/Card.json')
    .then(response => {
      if (response.data) {
        this.setState({
          cards: response.data,
          cardLength: Object.keys(response.data).length
        })
      }
    })
  }

//Can't get numeric value from cards object, so dabbling with length.
  componentDidUpdate(prevProps, prevState) {
    if (this.state.cardLength !== prevState.cardLength) {
      axios.get('https://collocationnet.firebaseio.com/Card.json')
      .then(response => {
        if (response.data) {
          this.setState({
            cards: response.data,
            cardLength: Object.keys(response.data).length
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }


//uses an argument passed from the card (the id) to delete a specific
//card, then calls .get to update the state.
  onDeleteHandler = (deleteKey) => {
    this.setState({loading: true})
    axios.delete('https://collocationnet.firebaseio.com/Card/'+deleteKey+'.json')
      .then(response => {
            this.setState({loading: false})
            axios.get('https://collocationnet.firebaseio.com/Card.json')
            .then(response => {
              if (response.data) {
                this.setState({
                  cards: response.data,
                  cardLength: Object.keys(response.data).length
                })
              }
            })
      }).catch(response => {
          this.setState({error: true})
      })
  }

//the next 3 functions just change the text of the state
  onChangeHandlerChinese = (event) => {
    this.setState({chinese: event.target.value})
  }

  onChangeHandlerEnglish = (event) => {
    this.setState({english: event.target.value})
  }

  onChangeHandlerHsk = (event) => {
    this.setState({hsk: event.target.value})
  }

  onChangeHandlerPinyin = (event) => {
    this.setState({pinyin: event.target.value})
  }



  //this is called when a new card is submitted, it creates a 'Card'
  //and posts it to the database via axios. Then it gets the whole
  //database and refreshes the state. Also gets length for componentDidMount
  handleSubmit = (event) => {
    this.setState({loading: true});
    event.preventDefault();
    const Card = {
      chinese: this.state.chinese,
      english: this.state.english,
      hsk: this.state.hsk,
      pinyin: this.state.pinyin
    }
    axios.post('https://collocationnet.firebaseio.com/Card/.json', Card)
    .then(response => {
      this.setState({loading: false})
      //Gets the updated cards and sets the state + length.
          axios.get('https://collocationnet.firebaseio.com/Card.json')
          .then(response => {
            this.setState({
              cards: response.data,
              cardLength: Object.keys(response.data).length
            })
          })
    }).catch(error => {
      this.setState({loading: false})
    })
  }

  render () {
    let posts = null;
    if (this.state.cards) {
    posts = Object.keys(this.state.cards).map((key, index) => {
      return (
         <CardsForDatabase
         key={key}
         deleteId={key}
         chinese={this.state.cards[key].chinese}
         english={this.state.cards[key].english}
         hsk={this.state.cards[key].hsk}
         pinyin={this.state.cards[key].pinyin}
         clicked={() => this.onDeleteHandler(key)}
         />
       )
    })
  }


    return (
    <Aux>
      <div className={classes.AddCardToDatabase}>
      <form onSubmit={this.handleSubmit}>
      <div className={classes.ChineseInput}>
          <label>
            Chinese
            <p className={classes.reminder}>(Please Put Spaces Between Words)</p>
            <p></p>
            <input type="text" value={this.state.chinese} onChange={this.onChangeHandlerChinese} />
          </label>
      </div>
      <div className={classes.EnglishInput}>
          <label>
            English
            <p></p>
              <input type="text" value={this.state.english} onChange={this.onChangeHandlerEnglish} />
          </label>
      </div>
      <div className={classes.HskInput}>
          <label>
            HSK
            <p></p>
            <input type="text" value={this.state.hsk} onChange={this.onChangeHandlerHsk} />
          </label>
      </div>
      <div className={classes.PinyinInput}>
          <label>
            Pinyin
            <p></p>
              <input type="text" value={this.state.pinyin} onChange={this.onChangeHandlerPinyin} />
          </label>
      </div>
            <input type="submit" value={"Submit"} className={classes.SubmitButton}/>
      </form>
        <Backdrop show={this.state.loading} />
        <button className={classes.homeButton}><a href="/Home">Home</a></button>
      </div>
      <div className={classes.cardBox}>
        {posts}
      </div>
    </Aux>
    )
  }
}

export default AddCardToDatabase;
