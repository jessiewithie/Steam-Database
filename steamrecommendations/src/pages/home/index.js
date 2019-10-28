import React, {Component} from 'react';
import {HomeWrapper} from './style';
import YouTube from './youtube';
import content from './content';

class Home extends Component {
    render() {
        return(
            <HomeWrapper>
                <content>
                    <YouTube />
                </content>
            </HomeWrapper>
        )
    }
}
export default Home;