import * as React from 'react';

import { Query } from 'react-apollo';
import { MeQuery } from '../../../../schemaTypes';
import { meQuery } from '../../../graphql/Queries';

const MeView = () => {
    return (
        <Query<MeQuery> query={meQuery}>
            {({ loading, data }) => {
                if (loading) {
                    return null;
                }

                if (!data) {
                    return <div>data is undefined</div>;
                }
                console.log(data);
                if (!data.me) {
                    return <div>received no user</div>;
                }

                return <div>{data.me.email}</div>;
            }}
        </Query>
    );
};

export default MeView;
