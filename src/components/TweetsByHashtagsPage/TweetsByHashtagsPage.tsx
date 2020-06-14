import React from 'react';
import './tweets-by-hashtags-page.scss';
import { FilteredTweets } from '../FilteredTweets/FilteredTweets';
import { TweetModel } from '../../types/TweetModels';
import { TweetFilter } from '../TweetFilter/TweetFilter';
import { MenuTabs } from '../MenuTabs/MenuTabs';

declare module TweetsByHashtagsPageType {
  export interface State {
    tweets?: TweetModel[];
    isFilter: boolean;
    errorFetchingApi: string;
    pageIndex: number;
  }
}

class TweetsByHashtagsPage extends React.Component<{}, TweetsByHashtagsPageType.State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      errorFetchingApi: '',
      isFilter: false,
      pageIndex: 1,
    }
  }

  public render(): JSX.Element {

    const renderTweets = () => {
      if (this.state.errorFetchingApi !== '') {
        return (
          <div className="api-error">
            <p>{ this.state.errorFetchingApi }</p>
          </div>
        );
      } else {
        return (
          <FilteredTweets 
            tweets={this.state.tweets} 
            currentPageIndex={this.state.pageIndex} 
            pageIndexChanged={(pageIndex: any) => this.setState({ pageIndex })}
          />
        );
      }
    }

    return (
      <>
        <MenuTabs activeKey="hashtags" /> 
        <div className="tweets-tab">
          <TweetFilter 
            filterType="hashtags"
            pageIndex={this.state.pageIndex}
            updateFilteredTweets={(tweets: TweetModel[], errorFetchingApi: string) => this.setState({ tweets, errorFetchingApi }) }
          />
          { renderTweets() }
        </div>
      </>
    );
  }
}

export { TweetsByHashtagsPage };
