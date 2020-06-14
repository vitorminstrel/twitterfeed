import React from 'react';
import './tweet-filter.scss';
import { Spinner, FormControl } from 'react-bootstrap';
import { TweetFeedService, TweetType } from '../../services/tweet-feed-service';
import { TweetModel } from '../../types/TweetModels';

declare module TweetFilterType { 
  export interface State {
    textFilter: string;
    loadingFilter: boolean;
    noResults: boolean;
  }
  
  export interface Props {
    pageIndex: number;
    filterType: TweetType;
    updateFilteredTweets:(tweets: TweetModel[], error: string) => void;
  }
}

class TweetFilter extends React.Component<TweetFilterType.Props, TweetFilterType.State> {

  constructor(props: TweetFilterType.Props) {
    super(props);
    this.state = {
        textFilter: '',
        loadingFilter: false,
        noResults: false,
    }
  }

  componentDidUpdate(prevProps: TweetFilterType.Props, prevState: TweetFilterType.State) {
    if (prevProps.pageIndex !== this.props.pageIndex) {
      this.filterBtnClick();
    }
  }

  private filterTextKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter'){
      this.filterBtnClick();
    }
  }

  private filterTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ textFilter: event.currentTarget.value });
  }
  
  private filterBtnClick = () => {
    if (this.state.loadingFilter)
      return;

    if (this.state.textFilter !== '') { 
      this.setState({ loadingFilter: true, noResults: false });
      TweetFeedService.getTweetsBy(this.props.filterType, this.state.textFilter, this.props.pageIndex)
      .then(tweets => { 
        this.props.updateFilteredTweets(tweets, '');
      }).catch(errorFetchingApi => {
        this.props.updateFilteredTweets([], errorFetchingApi);
      }).finally(() => {
        this.setState({ loadingFilter: false });
      })
    }
  }
    
  public render(): JSX.Element {
    const renderFilterInput = () => {
      const renderLoadingScreen = () => {
        
        if (!this.state.loadingFilter) {
          return null;
        }
        return (
          <div className="loading-screen">
            <div className="spinner">
              <Spinner animation="border" />
            </div>
          </div>
        );
      };

      return (
        <div className="tweet-filter">
          <FormControl 
            id="filterTxt" 
            type="text" 
            className="text-input"
            placeholder={`Search by ${this.props.filterType}`} 
            onKeyPress={this.filterTextKeyPressed} 
            onChange={this.filterTextChanged} 
          />
          <div className="filter-right-content">
            <div className="img-div" onClick={this.filterBtnClick} />
          </div>
          { renderLoadingScreen() }
        </div>
      );
    };

    return (
      <div>
          { renderFilterInput() }
      </div>
    )
  }
}

export { TweetFilter };
export type { TweetFilterType }
