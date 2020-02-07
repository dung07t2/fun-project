import React, { FC } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { Query } from 'react-apollo';
import { AllPostQuery } from '../../schemaTypes';
import { postsQuery } from '../graphql/Queries';

import Post from '../components/post/Post';
import Spinner from '../components/UI/Spinner/Spinner';

type Post = {
    _id: string;
    postType: string;
    title: string;
    description: string;
    url: string;
    created: string;
    _user: {
        _id: string,
        email: string
    }
};

const FeedPage: FC<RouteComponentProps<{}>> = props => {

    const clickHandler = (id: string) => {
        return props.history.push('/posts/' + id);
    };

    return (
        <Query<AllPostQuery> query={postsQuery} fetchPolicy="no-cache">
            {({ loading, data }) => {
                if (loading) {
                    return <Spinner />;
                }
                if (!data) {
                    return <div>data is undefined</div>;
                }
                console.log(data);
                let posts: Post[] = [];

                if (data.getAllPosts) {
                    data.getAllPosts.map(p => {
                        const newPost: Post = {
                            _id: p!._id,
                            postType: p!.postType,
                            title: p!.title,
                            description: p!.description!,
                            url: p!.url!,
                            created: p!.url!,
                            _user: {
                                _id: p!._user!._id,
                                email: p!._user!.email
                            }
                        };
                        return posts.push(newPost);
                    });
                    posts.sort((p1, p2) => {
                        return +new Date(p1.created) - +new Date(p2.created);
                    });
                }

                const postElement = posts.map(post => {
                    return (
                        <Post
                            key={post._id}
                            _id={post._id}
                            title={post.title}
                            description={post.description}
                            url={post.url}
                            user={post._user.email.split("@")[0]}
                            time={post.created.toString()}
                            isFull={false}
                            clickHandler={() => clickHandler(post._id)}
                        ></Post>
                    );
                });

                return <div>{postElement}</div>;
            }}
        </Query>
    );
};

export default FeedPage;
