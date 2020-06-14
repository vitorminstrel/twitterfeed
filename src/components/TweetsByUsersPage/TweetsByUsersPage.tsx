import React from 'react';
import './tweets-by-users-page.scss';
import { FilteredTweets } from '../FilteredTweets/FilteredTweets';
import { TweetModel } from '../../types/TweetModels';
import { TweetFilter } from '../TweetFilter/TweetFilter';
import { MenuTabs } from '../MenuTabs/MenuTabs';

declare module TweetsByUsersPageType {
  export interface State {
    tweets?: TweetModel[];
    isFilter: boolean;
    errorFetchingApi: string;
    pageIndex: number;
  }
}

class TweetsByUsersPage extends React.Component<{}, TweetsByUsersPageType.State> {

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
        <MenuTabs activeKey="users" /> 
        <div className="tweets-tab">
          <TweetFilter 
            filterType="users"
            pageIndex={this.state.pageIndex}
            updateFilteredTweets={(tweets: TweetModel[], errorFetchingApi: string) => this.setState({ tweets, errorFetchingApi }) }
          />
          { renderTweets() }
        </div>
      </>
    );
  }
}

export { TweetsByUsersPage };
