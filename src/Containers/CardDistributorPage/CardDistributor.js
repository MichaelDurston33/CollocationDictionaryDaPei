import React, { Component } from 'react';
import classes from './CardDistributor.css'
import axios from 'axios';

import CardsForClient from '../../Components/Cards/CardsForClient/CardsForClient.js'
import Backdrop from '../../Components/UI/Backdrop/Backdrop'
import Aux from '../../hoc/Aux'

import backgroundImage from '../../assets/images/chinaBackdrop.jpg'


class CardDistributor extends Component {
  constructor(props) {
    super(props)
    this.onChangeHandlerEnglish = this.searchTermHandler.bind(this);
    this.state = {
      //"cards" is a big scary database object which needs to have
      //Object.keys ran on it to do anything meaningful.
      cards: [],
      //searchTerm is the search query entered by the client.
      searchTerm: '',
      //loading = true will create a transparent backdrop overlay
      //over the page.
      loading: false,
      //loadLength is the amount of items loaded in, the
      //client can change this value to load in more/less
      loadLength: 10,
      keys: []
    }
  }

  componentDidMount() {
    //this will add more tiles to the page when the user has
    //scrolled to the bottom. It does this buy checking the user's
    //current position to the scrollable length.
    document.addEventListener('scroll', () => {
      var offset = document.documentElement.scrollTop + window.innerHeight;
      var height = document.body.scrollHeight;
      const reachedBottom = offset === height;
      if (reachedBottom) {
        this.loadMore()
      }
    })

    this.setState({loading: true})
    axios.get('https://collocationnet.firebaseio.com/Card.json')
      .then(response => {
        //shortens the response rather than loading in the entire DB.
        var shortenedResponseData = Object.entries(response.data).slice(0,this.state.loadLength).map(entry => entry[1]);
        //gets the keys that were lost as a result of the line of code
        //above this comment.
        if (response.data) {
          var keys = Object.keys(response.data).map((key, index) => {
            return key
          })
          this.setState({
            cards: shortenedResponseData,
            keys: keys
        })
        this.setState({loading: false})
      }
    }).catch(error => {
      console.log('error')
    })
  }

  componentDidUpdate(prevProps, prevState) {
    //If the user deletes their initial query from the searchbar
    //it goes back to being the shortened response. If This
    //wasn't included, upon deletion the entire database would
    //be loaded.
    if (this.state.searchTerm !== prevState.searchTerm && this.state.searchTerm.length === 0) {
      axios.get('https://collocationnet.firebaseio.com/Card.json')
        .then(response => {
          var shortenedResponseData = Object.entries(response.data).slice(0,this.state.loadLength).map(entry => entry[1]);
          var keys = Object.keys(response.data).map((key, index) => {
            return key
          })
          if (response.data) {
            this.setState({
              cards: shortenedResponseData,
              keys: keys
              })
        }
      }).catch(error => {
        console.log('error')
      })
    }
    //Updates the responses depending on the searchQuery.
     else if (this.state.searchTerm !== prevState.searchTerm) {
      axios.get('https://collocationnet.firebaseio.com/Card.json')
      .then(response => {
        //goes through the response.data object and checks if the .Chinese
        //contains the searchterm, returns that piece of data if it does
        //so it can be processed in the render(){}
        var filterExceptSearchTerm = Object.keys(response.data).map((key, index) => {
          if (response.data[key].chinese.includes(this.state.searchTerm) || response.data[key].hsk.includes(this.state.searchTerm) ) {
            return response.data[key]
          } else {
        //returns an empty array if the searchterm is not found.
            return []
          }
          })
          //sets the cards state to only the responses
          //which contain the searchterm.
        this.setState({cards: filterExceptSearchTerm})
      })
    }
  }

  searchTermHandler = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  loadMore = () => {
    this.setState({loadLength: 9})
  }

  render () {
    let posts = null;
      if (this.state.cards) {
        posts = Object.keys(this.state.cards).map((key, index) => {
          //checks if the .chinese actually contains stuff, Otherwise
          //there will be a bunch of empty cards as things are filtered.
          //The cause of this is the "else" in componentDidUpdate returning an empty array.
          if (this.state.cards[key].chinese) {
            return (
              <CardsForClient
                key={this.state.keys[key]}
                linkId={this.state.keys[key]}
                chinese={this.state.cards[key].chinese}
                english={this.state.cards[key].english}
                hsk={this.state.cards[key].hsk}
                pinyin={this.state.cards[key].pinyin}
              />
            )
          } else {
            return null;
          }
        })
      }


    return (
        <div className={classes.background}>
          <Backdrop show={this.state.loading} />
          <div className={classes.CardDistributor}>
            <div className={classes.SearchText}>Search Characters or HSK levels.</div>
            <input type="text" className={classes.Searchbar} onChange={this.searchTermHandler} autofocus="true"></input>
            <button className={classes.homeButton} ><a href="/Home" >Home</a></button>
           </div>
           <div className={classes.cardBox}>
           {posts}
           </div>
        </div>
    )
  }
}

export default CardDistributor;
