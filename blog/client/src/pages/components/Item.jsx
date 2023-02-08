


import React from "react"

function Item(){
    return(
        <div className="item-container">
            <div className="item-box" style={{background: `url("https://www.tripsavvy.com/thmb/qFqPcg6Wo24Hu4fLokNfAZdC-xQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg")`}}>
                <div className="article-header">
                    <h2 className="category">Travelling</h2>
                    <h1 className="article-title">Japan's finest areas</h1>
                    <div className="article-info">
                        <img className="author-img" src="https://www.unh.edu/unhtoday/sites/default/files/styles/article_huge/public/article/2019/professional_woman_headshot.jpg?itok=3itzxHXh" alt="author's image" />
                        <p className="author">By Kimesha Edward</p>
                        <p className="date">Wednesday, 24-March-2023</p>
                    </div>
                </div>
            </div>
        </div>   
    )
    
}

export default Item

