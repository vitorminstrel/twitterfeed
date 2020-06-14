import { shallow } from 'enzyme';
import React from 'react';

const HistoryMock = {
    push: jest.fn()
};

const reloadMock = jest.fn();
const { location } = window;
delete window.location;
window.location = { reload: reloadMock };

jest.mock('../../history', () => {
    return HistoryMock;
});

import { MenuTabs } from './MenuTabs';


describe('<MenuTabs />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterAll(() => {
        window.location = location;
    })

    it('should have both tabs', () => {
        const wrapper = shallow(<MenuTabs activeKey="hashtags" />);

        expect(wrapper.find('#hashtagsTab').exists()).toBeTruthy();
        expect(wrapper.find('#usersTab').exists()).toBeTruthy();
    });
    
    it('should have class matching tab--active', () => {
        const wrapper = shallow(<MenuTabs activeKey="hashtags" />);

        expect(wrapper.find('#hashtagsTab').hasClass('tab--active')).toBeTruthy();
        expect(wrapper.find('#usersTab').hasClass('tab--active')).toBeFalsy();
        
        wrapper.setProps({ activeKey: 'users' });
        
        expect(wrapper.find('#hashtagsTab').hasClass('tab--active')).toBeFalsy();
        expect(wrapper.find('#usersTab').hasClass('tab--active')).toBeTruthy();
        
    });

    it('should call push function from history when clicking different tab', () => {
        // delete window.location;
        const wrapper = shallow(<MenuTabs activeKey="hashtags" />);

        expect(wrapper.find('#usersTab').simulate('click'));
        
        expect(reloadMock).toBeCalledTimes(1);
        expect(HistoryMock.push).toBeCalledTimes(1);
    });

    it('should not call push function from history when clicking the same tab', () => {
        reloadMock.mockClear();
        const wrapper = shallow(<MenuTabs activeKey="hashtags" />);

        expect(wrapper.find('#hashtagsTab').simulate('click'));

        expect(reloadMock).toBeCalledTimes(0);
        expect(HistoryMock.push).toBeCalledTimes(0);
    });
});
