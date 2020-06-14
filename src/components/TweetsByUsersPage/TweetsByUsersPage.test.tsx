import { shallow } from 'enzyme';
import React from 'react';

import { TweetsByUsersPage } from './TweetsByUsersPage';
import { FilteredTweets } from '../FilteredTweets/FilteredTweets';
import { MenuTabs } from '../MenuTabs/MenuTabs';
import { TweetFilter } from '../TweetFilter/TweetFilter';


describe('<TweetsByUsersPage />', () => {

    it('should display/hide components according to state', () => {
        const wrapper = shallow(<TweetsByUsersPage />);
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
