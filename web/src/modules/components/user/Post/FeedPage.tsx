import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { PostQuery } from '../../../../schemaTypes';

const postQuery = gql`
    query PostQuery {
        postsByUser {
            _id
            postType
            title
            description
            url
        }
    }
`;

const FeedUserPage: React.FC = () => {
    return (
        <Query<PostQuery> query={postQuery}>
            {({ loading, data }) => {
                if (loading) {
                    return null;
                }

                if (!data) {
                    return <div>data is undefined</div>;
                }

                if (!data.postsByUser) {
                    return <div>received no user</div>;
                }
                console.log(data);
                const postsOutput = data.postsByUser.map(p => {
                    return (
                        <span
                            style={{
                                textTransform: 'capitalize',
                                display: 'flex',
                                margin: '0 8px',
                                border: '1px solid #ccc',
                                padding: '5px',
                            }}
                            key={p!._id}
                        >
                            {p!.title} ({p!.url})
                        </span>
                    );
                });
                return <div>{postsOutput}</div>;
            }}
        </Query>
    );
};

export default FeedUserPage;
