import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { meQuery } from '../../../graphql/Queries';
import { MeQuery } from '../../../../schemaTypes';

export default class PostTypePage extends React.PureComponent<RouteComponentProps> {
    clickHandler = (postType: string) => {
        console.log('Post type page' + postType);
        return this.props.history.push('/post/' + postType);
    };

    render() {
        return (
            <Query<MeQuery> query={meQuery} fetchPolicy="no-cache">
                {({ loading, data }) => {
                    if (loading) {
                        return null;
                    }

                    if (!data) {
                        return <div>data is undefined</div>;
                    }
                    console.log(data);

                    if (!data.me) {
                        return <Redirect to="/login" />;
                    }

                    return (
                        <div>
                            <button onClick={() => this.clickHandler('text')}>Text Type</button>
                            <button onClick={() => this.clickHandler('video')}>Video Type</button>
                            <hr />
                            {/* <PostPage postType="video"/> */}
                        </div>
                    );
                }}
            </Query>
        );
    }
}
