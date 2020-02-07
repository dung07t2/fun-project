import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { registerMutation, loginMutation } from '../graphql/Queries';
import { render } from '@testing-library/react';
import MeView from '../components/user/account/MeView';

const mocks = [
    {
        request: {
            query: registerMutation,
            variables: { email: 'c@cc.com', password: 'test' },
        },
        result: {
            data: {
                me: {
                    _id: '5e28abdce8f5df74da5c5692',
                    email: 'c@cc.com',
                },
            },
        },
    },
    {
        request: {
            query: loginMutation,
            variables: { email: 'c@cc.com', password: 'test' },
        },
        error: new Error('Something went wrong'),
    },
];

it("runs the mocked query", () => {
  render(
    <MockedProvider mocks={mocks}>
      <MeView />
    </MockedProvider>
  )

  // Run assertions on <MyQueryComponent/>
});
