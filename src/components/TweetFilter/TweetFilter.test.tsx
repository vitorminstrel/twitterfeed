import { shallow } from 'enzyme';
import React from 'react';

const getTweetsByMock = jest.fn(() => Promise.resolve());
const TweetFeedServiceMock = {
  getTweetsBy: getTweetsByMock
};

jest.mock('../../services/tweet-feed-service', () => {
    return { TweetFeedService: TweetFeedServiceMock };
});

const updateFilteredTweetsMock = jest.fn();

import { TweetFilter, TweetFilterType } from './TweetFilter';
import { Spinner } from 'react-bootstrap';

describe('<TweetFilter />', () => {

    const props: TweetFilterType.Props = {
        pageIndex: 1,
        filterType: 'users',
        updateFilteredTweets: updateFilteredTweetsMock,
    }
    
    it('should show paging according to displayPaging prop', () => {
        const wrapper = shallow(<TweetFilter {...props} />);
    });

    
    it('button click should not call service when no text is typed into input', () => {
        const wrapper = shallow(<TweetFilter {...props} />);

        const button = wrapper.find('.img-div');
        button.simulate('click');

        expect(TweetFeedServiceMock.getTweetsBy).toBeCalledTimes(0);
        
    });

    it('button click should call service when there is text into input', () => {
        const wrapper = shallow(<TweetFilter {...props} />);

        wrapper.setState({ textFilter: 'a' });
        const button = wrapper.find('.img-div');
        
        button.simulate('click');
        expect(TweetFeedServiceMock.getTweetsBy).toBeCalledTimes(1);
    });

    it('should update text state upon typing', () => {
        const wrapper = shallow(<TweetFilter {...props} />);
        const text = wrapper.find('#filterTxt');

        text.simulate('change', {currentTarget: {value: 'abc'}});

        expect(wrapper.state().textFilter).toEqual('abc');
    });
    
    it('should display spinner depending on loadingFilter state', () => {
        const wrapper = shallow(<TweetFilter {...props} />);

        expect(wrapper.find(Spinner).exists()).toBeFalsy();

        wrapper.setState({loadingFilter: true});
        
        expect(wrapper.find(Spinner).exists()).toBeTruthy();
    });
});