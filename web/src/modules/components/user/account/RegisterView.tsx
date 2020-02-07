import * as React from 'react';

import { Mutation } from '@apollo/react-components';
import { RouteComponentProps } from 'react-router-dom';
import { RegisterMutation, RegisterMutationVariables } from '../../../../schemaTypes';
import { registerMutation } from '../../../graphql/Queries';
import { Form } from './Form';

export class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {
    state = {
        email: '',
        password: '',
    };

    handleChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <Mutation<RegisterMutation, RegisterMutationVariables> mutation={registerMutation}>
                {mutate => (
                    <Form
                    buttonText="register"
                    onSubmit={async data => {
                        // optional reset cache
                        //   await client.resetStore();
                        const response = await mutate({
                            variables: data,
                        });
                    
                        if (!response.data!.register) {
                            console.log('Check your info!!!!');
                        } else {
                            this.props.history.push('/login');
                        }
                    }}
                />
                )}
            </Mutation>
        );
    }
}
