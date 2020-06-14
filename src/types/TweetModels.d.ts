export interface TweetModel {
    account: Account,
    date: string,
    hashtags: string,
    likes: string,
    replies: string,
    retweets: string,
    text: string,
}

export interface Account {
    fullname: string,
    href: string,
    id: string,
}
