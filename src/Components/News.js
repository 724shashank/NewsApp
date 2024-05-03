import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from './Footer';




export class News extends Component {

    static defaultProps = {
        pageSize: 6,
        category: 'general',
    }

    static propTypes = {
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)}-NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=07c6f9e21f424ed39b857dc2c8de10c5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {

        await this.updateNews();

    }

    /*preButton = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }*/


    /* nxtButton = async () => {
         this.setState({ page: this.state.page + 1 })
         this.updateNews(this.page);
     }*/

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=07c6f9e21f424ed39b857dc2c8de10c5&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults })
    }


    render() {
        return (

            <>
                <h1 className='text-center' style={{ marginTop: '90px', marginBottom: '45px' }} >NewsMonkey-Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {!(this.state.loading) && this.state.articles.map((elements) => {
                                return <div className='col-md-4' key={elements.url}>
                                    <NewsItem title={elements.title ? elements.title.slice(0, 44) : ""} description={elements.description ? elements.description.slice(0, 86) : ""} imageUrl={elements.urlToImage} newsUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name} />

                                </div>

                            })}
                        </div>
                    </div>
                   
                </InfiniteScroll>
                <Footer/>

                {/* <div className="container d-flex justify-content-between ">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark " onClick={this.preButton}> &larr; Previous </button>
                    <button type="button" className="btn btn-dark " onClick={this.nxtButton}>Next &rarr;</button>
                </div>*/}


            </>

        )
    }
}

export default News