import React, {Component} from 'react';

const About=()=>{
return (<div className='aboutcontent'>
    <h2>About</h2> 
    <p>
        This application is based on TMDB, using React framework and firebase as the backend,
        providing user a platform to share their ideas about different movies. 
        Here you can comment freely and interact with other users.
    </p>
    <p>
        If you have any further questions or suggestions, please don't hesitate to email  {'  '} 
        <a href="mailto:shuoc1218@gmail.com?subject=Questions" title="">me</a>.
    </p>
</div>)
}

export default About