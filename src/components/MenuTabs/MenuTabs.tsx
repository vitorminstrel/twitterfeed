import React from 'react';
import './menu-tabs.scss';
import history from '../../history';
import { TweetType } from '../../services/tweet-feed-service';

declare module MenuTabsType { 
  export interface Props {
    activeKey: string,
  }
}

const MenuTabs: React.StatelessComponent<{ activeKey: TweetType }> = (props) => {
  const changePage = (tab: string, tabClass: string) => {
    if (!tabClass.includes('active')) {
      history.push(tab);
      window.location.reload();
    }
  }
  const hashtagsTabClass = `tab${props.activeKey === 'hashtags' ? ' tab--active' : ''}`;
  const usersTabClass = `tab${props.activeKey === 'users' ? ' tab--active' : ''}`;

  return (
    <ul className="menu-tabs" >
      <li id="hashtagsTab" className={hashtagsTabClass} onClick={() => changePage('hashtags', hashtagsTabClass)}>Hashtag search</li>
      <li id="usersTab" className={usersTabClass} onClick={() => changePage('users', usersTabClass)}>User search</li>
    </ul>
  );
};

export { MenuTabs };
