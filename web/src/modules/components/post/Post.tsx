import React, { FC } from 'react';
import ReactPlayer from 'react-player';

import { ReactComponent as Clap } from '../../../assets/clap.svg';
import './Post.css';

type PostType = {
    _id: string;
    title: string;
    description: string;
    url: string;
    user: string;
    time: string;
    isFull: boolean;
    clickHandler: () => void;
};

const Post: FC<PostType> = ({ _id, title, description, url, user, time, isFull, clickHandler }) => {
    return (
        <div className="Post" onClick={clickHandler}>
            <div className="Post-Header">
                <div className="Post-User-Avatar">
                    <div>
                        <img
                            className="ga"
                            alt="me"
                            src="https://avatars3.githubusercontent.com/u/5093782?s=460&v=4"
                        ></img>
                    </div>
                    <div className="gb">
                        <div>{user}</div>
                        <div>{time}</div>
                    </div>
                </div>
            </div>
            <div className="Post-Content">
                <section>
                    <figure className={url.length > 0 ? 'ie id' : 'hidden-content'}>
                        <div className="kb">
                            <div className="Post-BG">
                                <div className="player-wrapper">
                                    <ReactPlayer
                                        // url="https://www.youtube.com/watch?v=nSPoZ-Fom7s"
                                        key={_id}
                                        url={url}
                                        className="react-player"
                                        // playing
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </div>
                        </div>
                    </figure>
                    <h1> {title}</h1>
                    <p className={!isFull ? 'multi-line-ellipsis' : ''}>{description}</p>
                </section>
            </div>
            <span>
                <div className="Post-Bottom">
                    <div>
                        <Clap />
                    </div>
                    <div className="Post-Bottom-Count">27</div>
                    <div>15 responses</div>
                </div>
            </span>
        </div>
    );
};

Post.defaultProps = {
    url: '',
    user: 'no name',
    time: 'just time'
};

export default Post;
