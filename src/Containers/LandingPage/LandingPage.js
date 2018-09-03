import React, { Component } from 'react';
import classes from './LandingPage.css'
import Aux from '../../hoc/Aux';

import backgroundImage from '../../assets/images/chinaBackdrop.jpg'


class LandingPage extends Component {
  state = {
    x: 0,
    y: 0
  }

  _onMouseMove(e) {
   this.setState({ x: e.screenX, y: e.screenY });
 }

  render () {
    const { x, y } = this.state;
    let stylesShou = {
      marginLeft: x / 60 + 'px',
      marginTop: y / 80 + 'px',
      color: "white"
    }

    let stylesYou = {
      marginLeft: x / 72 + 'px',
      marginTop: y / 59 + 'px',
      color: "white"
    }

    let stylesCollocation = {
      marginLeft: x / 82 + 'px',
      marginTop: y / 69 + 'px',
      color: "white"
    }

    let stylesCollocationDict = {
      marginLeft: x / 82 + 'px',
      marginTop: y / 69 + 'px',
      color: "white"
    }



    var imageBackground = {
      backgroundImage: `url(${backgroundImage})`,
    }

    return (
      <Aux>
        <div className={classes.MouseTracker} onMouseMove={this._onMouseMove.bind(this)} style={imageBackground}>
          <div className={classes.daPeiContainerBox}>
            <div className={classes.shou} style={stylesShou}>搭</div>
            <div className={classes.you} style={stylesYou}>配</div>
            <div className={classes.EngTitle} style={stylesCollocation}>COLLOCATION</div>
            <div className={classes.EngTitleDict} style={stylesCollocationDict}>DICTIONARY</div>
            <button className={classes.CardsButton} style={stylesCollocation}><a href="/Cards">进入→</a></button>

          </div>
            <button className={classes.DatabaseButton}><a href="/AddCardToDatabase">Add To Database</a></button>

        </div>
      </Aux>
    )
  }
}


export default LandingPage;
