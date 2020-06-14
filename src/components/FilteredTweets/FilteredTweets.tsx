import React from 'react';
import './filtered-tweets.scss';
import { TweetModel } from '../../types/TweetModels';
import { TweetPaging } from '../TweetPaging/TweetPaging';

declare module FilteredTweetsType {
  export interface Props {
      tweets?: TweetModel[];
      currentPageIndex: number;
      pageIndexChanged: (pageIndex: number) => void;
  }
}

const FilteredTweets: React.StatelessComponent<FilteredTweetsType.Props> = (props) => {
  
  const renderFilteredTweets = () => {      
    if (props.tweets && props.tweets.length === 0) {
      return (
        <div className="no-results">
          <p>The API returned no results for the specified text</p>
        </div>
      );
    }

    const renderRows = () => {
      return props.tweets?.map((tweet, index) => {
        return (
        <tr id="tweet" key={`tweettr${index}`}>
          <td id={`tweetText${index}`} className="long-string">{tweet.text}</td>
          <td id={`tweetLikes${index}`} style={{textAlign: 'center'}}>{tweet.likes}</td>
          <td id={`tweetReplies${index}`} style={{textAlign: 'center'}}>{tweet.replies}</td>
          <td id={`tweetRetweets${index}`} style={{textAlign: 'center'}}>{tweet.retweets}</td>
          <td id={`tweetHashtags${index}`}>{tweet.hashtags}</td>
          <td id={`tweetDate${index}`}>{tweet.date}</td>
        </tr>
        )
      });
    };

    return (
      
      <table className="table">
        <thead>
          <tr>
            <th style={{width: '40%'}} scope="col">Tweet</th>
            <th style={{width: '10%', textAlign: 'center'}} scope="col">Likes</th>
            <th style={{width: '10%', textAlign: 'center'}} scope="col">Replies</th>
            <th style={{width: '10%', textAlign: 'center'}} scope="col">Retweets</th>
            <th style={{width: '10%'}} scope="col">Hashtags</th>
            <th style={{width: '10%'}} scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          { renderRows() }
        </tbody>
        
        <TweetPaging
          currentPageIndex={props.currentPageIndex} 
          pageIndexChanged={props.pageIndexChanged} 
          displayPaging={props.tweets !== undefined && props.tweets?.length > 0}
          hasNextPage={props.tweets !== undefined && props.tweets?.length === 10}
        />
      </table>
    );
  };

  return (
    <div className="filtered-tweets"> 
      { renderFilteredTweets() }
    </div>
  );
};

export { FilteredTweets };
