import React from 'react';
import './tweet-paging.scss';

declare module TweetPaging {
  export interface Props {
    displayPaging: boolean;
    pageIndexChanged: (pageIndex: number) => void;
    currentPageIndex: number;
    hasNextPage: boolean;
  }
}

const TweetPaging: React.StatelessComponent<TweetPaging.Props> = (props) => {
  
  const renderPageNumbers = () => {
    const numbers = [];
    const nextPage = props.hasNextPage ? 1 : 0;

    for (let i = 1; i <= props.currentPageIndex + nextPage; i++) {
      if (props.currentPageIndex === i) {
        numbers.push(
          <div id={`page${i}`} key={`page${i}`} className="page-box page-box--current">
            {i}
          </div>
        );
      }
      else {
        numbers.push(
          <div id={`page${i}`} key={`page${i}`} className= "page-box" onClick={() => props.pageIndexChanged(i)}>
            {i}
          </div>
        );
      }
    }

    if (numbers.length <= 1) {
      return null;
    }

    return numbers;
  }

  const renderBack = () => {
    if (props.currentPageIndex === 1) {
      return null;
    }

    return (
      <div id="back" className="page-box" onClick={() => props.pageIndexChanged(props.currentPageIndex - 1)}>
        {'<'}
      </div>
    );
  }

  const renderNext = () => {
    if (!props.hasNextPage) {
      return null;
    }
    
    return (
      <div id="next" className="page-box" onClick={() => props.pageIndexChanged(props.currentPageIndex + 1)}>
        {'>'}
      </div>
    )
  }

  return props.displayPaging ? (
    <div className="tweet-paging">
      {renderBack()}
      {renderPageNumbers()}
      {renderNext()}
    </div>
  ) : <></>;
}

export { TweetPaging };
