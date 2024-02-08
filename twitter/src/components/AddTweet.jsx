import { useState } from "react";

function AddTweet({onaddtwet}){
const [text, settext] = useState("");
      return (

        <>

        <input
        placeholder="Add new tweet...."
        value={text}
        onChange={(e) => settext(e.target.value)}
        />
        <button onClick={() =>{
          onaddtwet(text);
          settext("");
        }}>
          Tweet!!
        </button>
    
        
        </>



      )

}

export default AddTweet;