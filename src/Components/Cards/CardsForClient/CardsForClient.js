import React from 'react';

import classes from './CardsForClient.css';
import { Link } from 'react-router-dom'


const CardsForClient = (props) => {

  var time = Math.floor(Math.random() * 4) + 1;
  var space = Math.floor(Math.random() * 30) + 1;
  let styleTime = {
    "--animation-time": time + 's',
    "marginTop":  space +  "px"
  }

    return (
      <Link className={classes.Cards} style={styleTime} to={{
        pathname: '/tile/'+props.linkId,
        state: {
          chinese: props.chinese,
          english: props.english,
          hsk: props.hsk,
          pinyin: props.pinyin
        }
      }}>
        {props.chinese}
      </Link>
    )
}

export default CardsForClient;
