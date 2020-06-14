import { shallow } from 'enzyme';
import React from 'react';
import { FilteredTweets } from './FilteredTweets';
import { TweetPaging } from '../TweetPaging/TweetPaging';

describe('<FilteredTweets />', () => {

    const props = {
        tweets: [
            {
                account: {
                    fullname: 'fullname',
                    href: 'href',
                    id: 'id',
                },
                date: 'date',
                hashtags: 'hashtags',
                likes: 'likes',
                replies: 'replies',
                retweets: 'retweets',
                text: 'text',
            },
            {
                account: {
                    fullname: '',
                    href: '',
                    id: '',
                },
                date: '',
                hashtags: '',
                likes: '',
                replies: '',
                retweets: '',
                text: '',
            },
        ],
        currentPageIndex: 2,
        pageIndexChanged: jest.fn(),
    };

    it('should render 2 items for 2 tweets in list', () => {
        const wrapper = shallow(<FilteredTweets {...props} />);
        expect(wrapper.find('#tweet')).toHaveLength(2);
    });

    it('should render no results message for no tweets', () => {
        const wrapper = shallow(<FilteredTweets {...props} />);
        wrapper.setProps({tweets: []});
        expect(wrapper.find('.tweet')).toHaveLength(0);
        expect(wrapper.find('.no-results').exists()).toBeTruthy();
    });

    it('should show the right content', () => {
        const wrapper = shallow(<FilteredTweets {...props} />);

        expect(wrapper.find(TweetPaging).exists()).toBeTruthy();
        
        const tweetText = wrapper.find('#tweetText0');
        expect(tweetText.exists()).toBeTruthy();
        expect(tweetText.text()).toContain('text');

        const tweetLikes = wrapper.find('#tweetLikes0');
        expect(tweetLikes.exists()).toBeTruthy();
        expect(tweetLikes.text()).toContain('likes');

        const tweetReplies = wrapper.find('#tweetReplies0');
        expect(tweetReplies.exists()).toBeTruthy();
        expect(tweetReplies.text()).toContain('replies');

        const tweetRetweets = wrapper.find('#tweetRetweets0');
        expect(tweetRetweets.exists()).toBeTruthy();
        expect(tweetRetweets.text()).toContain('retweets');

        const tweetHashtags = wrapper.find('#tweetHashtags0');
        expect(tweetHashtags.exists()).toBeTruthy();
        expect(tweetHashtags.text()).toContain('hashtags');
        
        const tweetDate = wrapper.find('#tweetDate0');
        expect(tweetDate.exists()).toBeTruthy();
        expect(tweetDate.text()).toContain('date');
      
    });
});
