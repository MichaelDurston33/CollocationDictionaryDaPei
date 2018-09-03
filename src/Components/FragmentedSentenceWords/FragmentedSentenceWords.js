import React, { Component } from 'react';
//import axios from 'axios'
import ReactTooltip from 'react-tooltip'

import classes from './FragmentedSentenceWords.css';

class FragmentedSentenceWords extends Component {
  state = {
    translatedText: ''
  }


  // onHoverTranslate(characterOrWord) {
  //   axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180818T114532Z.41640c872706b637.7434657ea61d0d246c267c83a61fe2413289a62d&lang=en&text='+this.props.characterOrWord)
  //   .then((response) => {
  //     var output = response.data.text[0];
  //     this.setState({translatedText: "output"})
  //   })
  //   .catch((error) =>
  //     console.log(error)
  //   );
  // }

  inLibraryOnHoverTranslate = (characterOrWord) => {
    this.setState({translatedText: 'output'})
  }

  render () {

  return (
    <div>
    <ReactTooltip />
    <p
    data-tip={this.state.translatedText ? this.state.translatedText : 'loading'}
    onMouseOver={() => this.inLibraryOnHoverTranslate(this.props.characterOrWord)}
    className={classes.Character}>
    {this.props.characterOrWord}
    </p>
    </div>
    )
  }
};

export default FragmentedSentenceWords;
