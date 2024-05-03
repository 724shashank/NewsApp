import React, { Component } from 'react'

export class NewsItem extends Component {
  
    render() {
        let { title, description,newsUrl,imageUrl,author,date,source } = this.props;
        return (

            <div>
                <div className="card ">
                <div style={{display:'flex',justifyContent:'center',position:'absolute',right:'0'}}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">{source}</span>
                </div>
                    <img src={imageUrl ? imageUrl : "/Image_404.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark centered-button">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem