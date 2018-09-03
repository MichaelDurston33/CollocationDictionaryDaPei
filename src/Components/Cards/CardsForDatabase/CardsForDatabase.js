import React from 'react';

import classes from './CardsForDatabase.css';

const CardsForDatabase = (props) => (

      <div className={classes.Cards}>
        {props.chinese}
        <br></br>
        {props.english}
        <br></br>
        {props.pinyin}
        <br></br>
        {props.hsk}
        <p></p>
        <button onClick={props.clicked}>Delete</button>
      </div>

)

export default CardsForDatabase;
