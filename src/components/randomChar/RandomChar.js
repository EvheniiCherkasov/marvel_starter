import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import MarvelService from '../../services/MarvelService';
 
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }
    marvelService = new MarvelService();
    
    componentDidMount() {
        this.updateChar();
        //this.timerId = setInterval(this.updateChar, 3000);

        //остановлен от бесконечных запросов при работе
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onTryIt = () => {
        this.updateChar();
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {
        const {char, loading, error} = this.state;
        const errorMassage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/>: null;
        const content = !(loading || error) ? <View char = {char}/> : null;

        return (
        <div className="randomchar">
            {errorMassage} 
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={this.onTryIt} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const onStyleImage = () => {

        if (thumbnail.includes('image_not_available')) {
            return {
                objectFit: 'contain'
            }
        }

        
    }

    return (
        <div className="randomchar__block">
        <img src={thumbnail} style={onStyleImage()} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>

    ) 
} 

export default RandomChar;