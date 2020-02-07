import * as React from 'react';

import './PostPage.css';
import vimeo from '../../assets/vimeo_icon.png';
import { ReactComponent as URL } from '../../assets/url.svg';
import { ReactComponent as Video } from '../../assets/video.svg';
import { Mutation } from '@apollo/react-components';
import { RouteComponentProps } from 'react-router-dom';
import { PublishPostMutation, PublishPostMutationVariables } from '../../schemaTypes';
import { publishPostMutation } from '../graphql/Queries';

export class PostPage extends React.PureComponent<RouteComponentProps<{ postType: string }>> {
    state = {
        data: {
            postType: {
                value: '',
                valid: true,
            },
            title: {
                value: '',
                valid: false,
            },
            description: {
                value: '',
                valid: true,
            },
            url: {
                value: '',
                valid: false,
            },
        },
        isValid: false,
    };

    componentDidMount() {
        const temState = { ...this.state };
        temState.data.postType.value = this.props.match.params.postType;
        this.setState({ temState });
    }

    checkValidityElement = (name: string, value: string) => {
        const dupState = { ...this.state.data };
        let valid = true;
        if (dupState.postType.value === 'video' && name === 'url') {
            // isValid = value.trim() !== '' && isValid;
            const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            valid = pattern.test(value) && valid;
        }

        if (name === 'title') {
            valid = value.trim() !== '' && valid;
        }

        return valid;
    };

    render() {
        const { postType, title, description, url } = this.state.data;
        // const postType = this.props.location.state.postType;
        return (
            <Mutation<PublishPostMutation, PublishPostMutationVariables> mutation={publishPostMutation}>
                {mutate => (
                    <div className="Main">
                        <div className="BoxHeader">
                            <div>
                                <span>
                                    <Video className="IconHeader" />
                                </span>
                                <span className="CapitalizeText">{postType.value}</span>
                            </div>
                        </div>
                        <div className={postType.value==="video" ? "BoxVideo" : "HiddenUrl"}>
                            <span>Connect Vimeo to offer secure videos to your patrons or add a URL. </span>
                            <div className="VideoType">
                                <div className="VideoBox">
                                    <div>
                                        <div className="VideoBoxContent">
                                            <img className="Image" alt="Vimeo" src={vimeo} />
                                            <div className="ContentSpace">
                                                <span>Vimeo</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="VideoUrlBox">
                                    <div>
                                        <div className="VideoBoxContent">
                                            <URL className="Image" />
                                            <div className="ContentSpace">
                                                <span>Add URL</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={postType.value==="video" ? "EmbededURL" : "HiddenUrl"}>
                                <URL className="SVG" />
                                <input
                                    className="URLText"
                                    type="text"
                                    name="url"
                                    placeholder="Type or paste video URL"
                                    value={url.value}
                                    onChange={e => {
                                        const { name, value } = e.target;
                                        const valid = this.checkValidityElement(name, value);
                                        
                                        const dupState = {...this.state.data};
                                        dupState.url.value = value;
                                        dupState.url.valid = valid;
                                        this.setState({
                                            data: dupState,
                                        });
                                        const tempState = this.state.data;
                                        let isValid = true;
                                        isValid = tempState.title.valid && tempState.url.valid && isValid;
                                        this.setState({
                                            isValid: isValid,
                                        });
                                    }}
                                ></input>
                            </div>
                            <span>Embed support for YouTube, Vimeo, and more.</span>
                        </div>
                        <div className="BoxVideo">
                            <input
                                className="PostTitle"
                                type="text"
                                name="title"
                                placeholder="Post title (required)"
                                value={title.value}
                                onChange={e => {
                                    const { name, value } = e.target;
                                    const valid = this.checkValidityElement(name, value);
                                    const dupState = {...this.state.data};
                                    dupState.title.value = value;
                                    dupState.title.valid = valid;
                                    this.setState({
                                        data: dupState,
                                    });
                                    const tempState = this.state.data;
                                    let isValid = true;
                                    if (tempState.postType.value === 'video') {
                                        isValid = tempState.title.valid && tempState.url.valid && isValid;
                                    } else {
                                        isValid = tempState.title.valid && isValid;
                                    }
                                    this.setState({
                                        isValid: isValid,
                                    });
                                }}
                            />
                            <input
                                className="PostTitle"
                                type="text"
                                name="description"
                                placeholder="Description (option)"
                                value={description.value}
                                onChange={e => {
                                    const { name, value } = e.target;
                                    const valid = this.checkValidityElement(name, value);
                                    const dupState = {...this.state.data};
                                    dupState.description.value = value;
                                    dupState.description.valid = valid;
                                    this.setState({
                                        data: dupState,
                                    });
                                    const tempState = this.state.data;
                                    let isValid = true;
                                    if (tempState.postType.value === 'video') {
                                        isValid = tempState.title.valid && tempState.url.valid && isValid;
                                    } else {
                                        isValid = tempState.title.valid && isValid;
                                    }
                                    
                                    this.setState({
                                        isValid: isValid,
                                    });
                                }}
                            />
                        </div>
                        <div className="ButtonBox">
                            <button
                                className="Button"
                                disabled={!this.state.isValid}
                                onClick={async () => {

                                    const response = await mutate({
                                        variables: {
                                            postType: postType.value,
                                            title: title.value,
                                            description: description.value,
                                            url: url.value,
                                        },
                                    });
                                    console.log(response);
                                    if (!response.errors) {
                                        this.props.history.push('/feed');
                                        // this.props.history.push('/me');
                                    } else {
                                        console.log(response.errors);
                                    }
                                    
                                }}
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default PostPage;
