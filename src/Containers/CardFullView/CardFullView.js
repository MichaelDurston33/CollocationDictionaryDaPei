import React, { Component } from 'react';
import classes from './CardFullView.css';
import ReactTooltip from 'react-tooltip'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Aux from '../../hoc/Aux'

import backgroundImage from '../../assets/images/chinaBackdrop.jpg'

import FragmentedSentenceWords from '../../Components/FragmentedSentenceWords/FragmentedSentenceWords';

class CardFullView extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      arrayifiedChinese: [],
      joinedChinese: '',
      value: '',
      copied: false
    }
  }

  componentDidMount () {
    // this gets rid of the spaces as all the cards are entered
    // with spaces between the 'words'.
   var arrayifiedChinese = this.props.location.state.chinese.split(" ");
    this.setState({
      arrayifiedChinese: arrayifiedChinese,
      joinedChinese: arrayifiedChinese.join("")
    })
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state !== nextState.state) {
        return true;
    }
    return false
  }

  speakButton = () => {
    window.responsiveVoice.speak(this.props.location.state.chinese,"Chinese Male")
  }

  onMouseOffNoMoreCopied = () => {
      this.setState({copied: false})
      ReactTooltip.hide()
  }



  render () {

    let characters = this.state.arrayifiedChinese.map((key, index) => {
      return <FragmentedSentenceWords characterOrWord={key} key={index} />
    })

    return (
      <Aux>
        <button className={classes.homeButton}><a href="/Home">Home</a></button>
        <button className={classes.BackButton}><a href="/Cards">Back</a></button>

        <div className={classes.CardFullView} >
        <div className={classes.TranslateSentenceBox}>
        {characters}
        </div>
        <button className={classes.SpeakButton} onClick={this.speakButton}>♬</button>


              <ReactTooltip />
                <CopyToClipboard
                key={this.state.copied ? 'ChineseCopied' : 'ChineseNotCopied'}
                data-tip={this.state.copied ? "Copied!" : "Click to copy"}
                text={this.state.joinedChinese}
                onCopy={() => this.setState({copied: true})}
                onMouseOut={this.onMouseOffNoMoreCopied}>
                <p className={classes.ChineseText}>{this.state.joinedChinese}</p>
                </CopyToClipboard>

              <div className={classes.SupportingInfoBox}>
                <CopyToClipboard
                key={this.state.copied ? 'EnglishCopied' : 'EnglishNotCopied'}
                data-tip={this.state.copied ? "Copied!" : "Click to copy"}
                text={this.props.location.state.english}
                onCopy={() => this.setState({copied: true})}
                onMouseOut={this.onMouseOffNoMoreCopied}>
                <p>{this.props.location.state.english}</p>
                </CopyToClipboard>

                <CopyToClipboard
                key={this.state.copied ? 'PinyinCopied' : 'PinyinNotCopied'}
                data-tip={this.state.copied ? "Copied!" : "Click to copy"}
                text={this.props.location.state.pinyin}
                onCopy={() => this.setState({copied: true})}
                onMouseOut={this.onMouseOffNoMoreCopied}>
                <p>{this.props.location.state.pinyin}</p>
                </CopyToClipboard>
        </div>
      </div>
    </Aux>
    )
  }
}

export default CardFullView;
