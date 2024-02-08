
import Tweetlist from './Tweetlist';
import AddTweet from './AddTweet';
import { useState } from 'react';
const dummyTweets = [

    {id: 0, content: 'we have a new tweets' ,likecount: 2,createdAt: new Date()},
    {id: 1, content: 'whats inside it ',likecount: 3,createdAt: new Date()},
    {id: 2, content: 'what is up with tweet' , likecount:4, createdAt: new Date()}
  
  ];
  
function Twitter(){
  const [tweets , settweets] = useState(dummyTweets);
  const handleaddtweet = (texts) => {
       let nexid = (tweets.length > 0) ? tweets[tweets.length-1].id+1 : 0;
            settweets([...tweets, {
              content : texts,
              likecount: Math.floor(Math.random()*10),
              id: nexid, 
              createdAt: new Date()
            }]);
  }






    return (
        <>
            <AddTweet onaddtwet={handleaddtweet} />
            <Tweetlist tweets = {tweets}/>
        </>
      );

}

export default Twitter;