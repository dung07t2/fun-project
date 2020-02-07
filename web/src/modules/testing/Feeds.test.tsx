import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { postsQuery } from './../graphql/Queries';
import TestRenderer from 'react-test-renderer';
import wait from 'waait';

import MeView from '../components/user/account/MeView';

describe('Test the Query component', () => {
    it('should render without error', () => {
        TestRenderer.create(
            <MockedProvider mocks={[]}>
                <MeView />
            </MockedProvider>,
        );
    });

    it('should render loading state initially', () => {
        const component = TestRenderer.create(
            <MockedProvider mocks={[]}>
                <MeView />
            </MockedProvider>,
        );
        const tree = component.toJSON();
        expect(tree!.children).toContain('Loading...');
    });

    it('should render posts', async () => {
        const mocks = [
            {
                request: { query: postsQuery },
                result: {
                    data: {
                        getAllPosts: [
                            {
                                _id: '5e35278babfd82172f1f90eb',
                                postType: 'text',
                                title: 'test2',
                                description: 'test',
                                url: '',
                                _user: {
                                    _id: '5e288ed1871a0b6a59459c89',
                                    email: 'c@cc.com',
                                },
                                created: '1580541835691',
                            },
                        ],
                    },
                },
            },
        ];

        const component = TestRenderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MeView />
            </MockedProvider>,
        );

        await wait(5);

        const h3 = component.root.findByType('h3');
        expect(h3.children).toContain('Test');

        expect(component).toMatchSnapshot();
    });

    it('should query the posts and render error message', async () => {
        const mocks = [
            {
                request: { query: postsQuery },
                result: {
                    errors: [{ message: 'Error!' }],
                },
            },
        ];

        const component = TestRenderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MeView />
            </MockedProvider>,
        );

        await wait(5);

        const tree = component.toJSON();
        expect(tree!.children).toContain('Error :(');
    });
});
