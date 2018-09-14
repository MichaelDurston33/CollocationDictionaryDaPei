import React, { Component } from 'react';
import axios from 'axios'
import ReactTooltip from 'react-tooltip'

import classes from './FragmentedSentenceWords.css';

class FragmentedSentenceWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
        translatedText: '',
        answered: false,
    }
  }


  onHoverTranslate(characterOrWord) {
    axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180818T114532Z.41640c872706b637.7434657ea61d0d246c267c83a61fe2413289a62d&lang=en&text='+this.props.characterOrWord)
    .then((response) => {
      var output = response.data.text[0];
      this.setState({translatedText: output,
      answered: true
      })
    })
    .catch((error) =>
      console.log(error)
    );
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }


  render () {

  return (
    <div>
    <ReactTooltip />
    <p
    key={this.state.translatedText ? 'ChineseCopied' : 'ChineseNotCopied'}
    data-tip={this.state.translatedText && this.state.answered ? this.state.translatedText : 'loading'}
    onMouseOver={() => this.onHoverTranslate(this.props.characterOrWord)}
    className={classes.Character}>
    {this.props.characterOrWord}
    </p>
    </div>
    )
  }
};

export default FragmentedSentenceWords;
