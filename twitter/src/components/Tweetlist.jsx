import Tweet from "./Tweet";
import '../CSS/Tweetlist.css'
function Tweetlist({tweets}){
   
    return ( 
        <ul className="tweet-list">
           {
            tweets.map((tweet) =>(
                <li className="wrapper" key={tweet.id} >
                    <Tweet content={tweet.content} likecount={tweet.likecount} createdAt={tweet.createdAt.toString()}/>
                </li>
            ))
           }

        </ul>

    );

}

export default Tweetlist;