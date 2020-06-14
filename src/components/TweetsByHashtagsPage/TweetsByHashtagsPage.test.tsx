import { shallow } from 'enzyme';
import React from 'react';
import { FilteredTweets } from '../FilteredTweets/FilteredTweets';
import { TweetsByHashtagsPage } from './TweetsByHashtagsPage';
import { MenuTabs } from '../MenuTabs/MenuTabs';
import { TweetFilter } from '../TweetFilter/TweetFilter';


describe('<TweetsByHashtagsPage />', () => {

    it('should display/hide components according to state', () => {
        const wrapper = shallow(<TweetsByHashtagsPage />);
        wrapper.setState({ errorFetchingApi: 'ERROR' });
        const apiError = wrapper.find('.api-error');
        expect(apiError.exists()).toBeTruthy();
        expect(apiError.text()).toEqual('ERROR');
        wrapper.setState({ errorFetchingApi: '' });
        expect(wrapper.find('.api-error').exists()).toBeFalsy();

        expect(wrapper.find(MenuTabs).exists()).toBeTruthy();
        expect(wrapper.find(TweetFilter).exists()).toBeTruthy();
        expect(wrapper.find(FilteredTweets).exists()).toBeTruthy();
    });

});
