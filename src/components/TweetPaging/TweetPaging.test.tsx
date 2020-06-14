import { shallow } from 'enzyme';
import React from 'react';

const pageIndexChangedMock = jest.fn();

import { TweetPaging } from './TweetPaging';

describe('<TweetPaging />', () => {

    const props = {
        displayPaging: true,
        pageIndexChanged: pageIndexChangedMock,
        currentPageIndex: 2,
        hasNextPage: true,
    }
    
    it('should show paging according to displayPaging prop', () => {
        const wrapper = shallow(<TweetPaging {...props} />);

        expect(wrapper.find('.tweet-paging').exists()).toBeTruthy();
        expect(wrapper.find('#back').exists()).toBeTruthy();
        expect(wrapper.find('#next').exists()).toBeTruthy();
        expect(wrapper.find('#page1').exists()).toBeTruthy();
        expect(wrapper.find('#page2').exists()).toBeTruthy();

        wrapper.setProps({ displayPaging: false });

        expect(wrapper.find('.tweet-paging').exists()).toBeFalsy();
        expect(wrapper.find('#back').exists()).toBeFalsy();
        expect(wrapper.find('#next').exists()).toBeFalsy();
        expect(wrapper.find('#page1').exists()).toBeFalsy();
    });

    it('should not show back button when currentPageIndex is at 1', () => {
        const wrapper = shallow(<TweetPaging {...props} />);

        wrapper.setProps({ currentPageIndex: 1 });

        expect(wrapper.find('#back').exists()).toBeFalsy();
        expect(wrapper.find('#next').exists()).toBeTruthy();
        expect(wrapper.find('#page1').exists()).toBeTruthy();
        expect(wrapper.find('#page2').exists()).toBeTruthy();
    });

    it('should not show next button and page 3 when hasNextPage is false', () => {
        const wrapper = shallow(<TweetPaging {...props} />);

        wrapper.setProps({ hasNextPage: false });

        expect(wrapper.find('#next').exists()).toBeFalsy();
        expect(wrapper.find('#page1').exists()).toBeTruthy();
        expect(wrapper.find('#page2').exists()).toBeTruthy();
        expect(wrapper.find('#page3').exists()).toBeFalsy();
    });

    it('should have page-box--current according to the currentPageIndex prop', () => {
        const wrapper = shallow(<TweetPaging {...props} />);

        expect(wrapper.find('#page1').exists()).toBeTruthy();
        expect(wrapper.find('#page1').hasClass('page-box--current')).toBeFalsy();
        expect(wrapper.find('#page2').exists()).toBeTruthy();
        expect(wrapper.find('#page2').hasClass('page-box--current')).toBeTruthy();
        
        wrapper.setProps({ currentPageIndex: 1 });

        expect(wrapper.find('#page1').exists()).toBeTruthy();
        expect(wrapper.find('#page1').hasClass('page-box--current')).toBeTruthy();
        expect(wrapper.find('#page2').exists()).toBeTruthy();
        expect(wrapper.find('#page2').hasClass('page-box--current')).toBeFalsy();
    });

    it('should expect pageIndexChanged call when clicking a page', () => {
        const wrapper = shallow(<TweetPaging {...props} />);
        
        wrapper.find('#back').simulate('click');
        wrapper.find('#next').simulate('click');
        wrapper.find('#page1').simulate('click');
        wrapper.find('#page2').simulate('click');

        expect(pageIndexChangedMock).toBeCalledTimes(3);

    });
});
