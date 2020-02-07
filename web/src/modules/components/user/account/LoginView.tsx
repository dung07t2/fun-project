import * as React from 'react';

import { Mutation } from '@apollo/react-components';
import { RouteComponentProps } from 'react-router-dom';
import { LoginMutation, LoginMutationVariables } from '../../../../schemaTypes';
import { loginMutation, meQuery } from '../../../graphql/Queries';
import { Form } from './Form';

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
    render() {
        return (
            <Mutation<LoginMutation, LoginMutationVariables>
                update={(cache, { data }) => {
                    if (!data || !data.login) {
                        return;
                    }

                    cache.writeQuery({
                        query: meQuery,
                        data: { me: data.login },
                    });
                }}
                mutation={loginMutation}
            >
                {(mutate, { client }) => (
                    <Form
                        buttonText="login"
                        onSubmit={async data => {
                            // optional reset cache
                            await client!.resetStore();
                            const response = await mutate({
                                variables: data,
                            });
                            console.log(response);
                            if (!response.data!.login) {
                                console.log('Check your info!!!!');
                            } else {
                                this.props.history.push('/post-type');
                            }
                        }}
                    />
                )}
            </Mutation>
        );
    }
}
