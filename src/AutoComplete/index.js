import React from 'react';
import axios from 'axios';
import './index.css';

export const endPoint = 'https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json'


export const debounce = (fn, time) => {
    let timer = null;
    return function ({target: {value}}) {
        const context = this;

        if (timer !== null) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.call(context, value);
            timer = null;
        }, time)
    }
}

class AutoComplete extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            tangPoetry: [],
            keyword: '',
            matchesResult: [],

        }

        this.onKeywordChange = debounce(this.onKeywordChange, 300).bind(this);
        // this.onKeywordChange = this.onKeywordChange.bind(this);
    }

    componentDidMount() {
        axios.get(endPoint).then(({data: tangPoetry}) => {
            // console.log(tangPoetry);
            this.setState({tangPoetry})
        })
    }


    onKeywordChange(keyword) {
        this.setState((ste) => ({
            keyword,
            matchesResult: this.findMatches(keyword, ste.tangPoetry)
        }))
    }

    findMatches(wordToMatch, tangPoetry) {
        return tangPoetry.filter(poet => {
            const regex = new RegExp(wordToMatch, 'gi');
            const author = poet.detail_author.join('');
            return poet.detail_text.match(regex) || poet.title.match(regex) || author.match(regex);
        });
    }

    render() {
        const {matchesResult} = this.state;
        return (
            <form className="search-form">
                <input type="text" className="search" placeholder="诗名 诗句 诗人"
                       onInput={this.onKeywordChange} onChange={this.onKeywordChange}/>
                <ul className="suggestions">
                    {
                        matchesResult.length === 0
                            ? this.renderDefaultResult()
                            : this.renderMatchesResult()
                    }
                </ul>
            </form>
        )
    }

    renderDefaultResult() {
        return (
            <React.Fragment>
                <li>搜索一首诗</li>
                <li>或一个诗人</li>
            </React.Fragment>
        )
    }

    renderMatchesResult() {
        const {keyword} = this.state;
        return (
            <>
                {
                    this.state.matchesResult.map((item) => {
                        const regexp = new RegExp(keyword, 'gi');
                        const text = item.detail_text.replace(regexp, `<span class="hl">${keyword}</span>`);
                        const title = item.title.replace(regexp, `<span class="hl">${keyword}</span>`)
                        const titleAndAuthor = `${title} - ${item.detail_author[0]}`
                        return (
                            <li key={item.detail_text}>
                                <span className="poet" dangerouslySetInnerHTML={{__html: text}}></span>
                                <span className="title" dangerouslySetInnerHTML={{__html: titleAndAuthor}}></span>
                            </li>
                        )
                    })
                }
            </>
        );
    }
}


export default AutoComplete;
