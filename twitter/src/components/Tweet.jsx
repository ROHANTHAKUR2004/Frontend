import '../CSS/Tweet.css';
function Tweet({content , likecount , createdAt}){

    return (

        <div className="tweet-wrapper">
           <div className="tweet-content">
              {content}
           </div> 
        <div className='like-wrapper'>
           <div className="likes">
            {likecount} likes
            </div> 


            <div className="createdat"> 
                <b>At..</b> {createdAt}
            </div>
        </div>
        </div>

    );

}

export default Tweet;