import gql from 'graphql-tag';

export const registerMutation = gql`
mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
}
`;

export const loginMutation = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id
            email
        }
    }
`;

export const meQuery = gql`
    query MeQuery {
        me {
            _id
            email
        }
    }
`;

export const publishPostMutation = gql`
    mutation PublishPostMutation(
        $postType: String!
        $title: String!
        $description: String
        $url: String
    ) {
        publishPost(postType: $postType, title: $title, description: $description, url: $url) {
            _id
            postType
            title
            description
            url
            _user {
                _id
                email
            }
            created
        }
    }
`;

export const postByIdQuery = gql`
    query PostByIdQuery($id: String!) {
        postById(id: $id) {
            _id
            url
            title
            description
            _user {
                email
            }
            created
        }
    }
`;

export const postsQuery = gql`
    query AllPostQuery {
        getAllPosts {
            _id
            postType
            title
            description
            url
            created
            _user {
                _id
                email
            }
        }
    }
`;