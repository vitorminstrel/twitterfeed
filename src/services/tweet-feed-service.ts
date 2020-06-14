import { TweetModel } from "../types/TweetModels";

export type TweetType = 'hashtags' | 'users';
const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const TweetFeedService = {

    getTweetsBy(filter: TweetType, value: string,pageIndex: number): Promise<TweetModel[]> {
        return sendAjaxRequest(`https://cors-anywhere.herokuapp.com/https://anymind-recruitment-python-backend.adasia.biz/${filter}/${value}?offset=${pageIndex-1}`,
            (json: any): TweetModel[] => {
                if (!json.results) {
                    return [];
                }
            return json.results.map((tweet: any) => {
                return {
                    account: {
                        fullname: tweet.fullname,
                        href: tweet.href,
                        id: tweet.id,
                    },
                    date: formatDate(tweet.date),
                    hashtags: tweet.hashtags.slice(0, 2).join(", "),
                    likes: tweet.likes > 0 ? tweet.likes : '-',
                    replies: tweet.replies > 0 ? tweet.replies : '-',
                    retweets: tweet.retweets > 0 ? tweet.retweets : '-',
                    text: tweet.text,
                }
            });
        });
    }
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dateMonth = months[date.getMonth()].toLowerCase();
    const formatted_date = `${dateMonth.toLowerCase().replace(dateMonth[0], dateMonth[0].toUpperCase())} ${date.getDate()}, ${date.getFullYear()}`;
    return formatted_date;
}

const sendAjaxRequest = (queryString: string, mapCallback: (json: any) => any): any => {
    let request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        request.open('GET', queryString);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                try{
                    const json = JSON.parse(request.responseText);
                    if (json && json.error) {
                        throw json.error;
                    }
                    resolve(mapCallback(json));
                } catch (e) {
                    reject(e);
                }
            }
            else {
                reject('failed to connect to API');
            }
        }
        request.send();
    });
}