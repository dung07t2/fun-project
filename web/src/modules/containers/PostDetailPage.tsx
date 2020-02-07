import React from 'react';

import './PostDetailPage.css';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { PostByIdQuery, PostByIdQueryVariables } from '../../schemaTypes';
import { postByIdQuery } from '../graphql/Queries';
import Post from '../components/post/Post';
import Spinner from '../components/UI/Spinner/Spinner';

type PostParams = { id: string };

let nothing: void = undefined;

const PostDetailPage = ({ match }: RouteComponentProps<PostParams>) => {
    const {
        params: { id },
    } = match;

    const { loading, data } = useQuery<PostByIdQuery, PostByIdQueryVariables>(postByIdQuery, {
        variables: { id: id },
        fetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true,
        partialRefetch: true,
    });

    let resultPage = null;

    if (loading) {
        resultPage = <Spinner />;
    }

    if (!data) {
        resultPage = <div>Data is undefined.</div>;
    } else {
        resultPage = (
            <Post
                key={data.postById._id}
                _id={data.postById._id}
                title={data.postById.title}
                description={data.postById.description!}
                url={data.postById.url!}
                user={data.postById._user!.email.split('@')[0]}
                time={new Date(+data.postById.created! * 1000).toISOString().slice(-13, -5)}
                isFull={true}
                clickHandler={() => nothing}
            ></Post>
        );
    }

    return (
        <div>
            {/* {console.log(data)} */}
            {resultPage}
        </div>
    );
};

export default PostDetailPage;
