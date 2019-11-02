import React, {Component} from 'react';
import {
    HomeWrapper,
    Title
} from './style';
import YouTube from './youtube';
// import content from './content';

class Home extends Component {
    render() {
        return(
            <div>
            <HomeWrapper>
                <Title>
                    <h1>Recommend</h1>
                </Title>

                <YouTube></YouTube>
            </HomeWrapper>
            
            <HomeWrapper>
                <Title>
                    <h1>Latest</h1>
                </Title>
                <YouTube></YouTube>
            </HomeWrapper>
            </div>
        )
    }
}
export default Home;