import React  from 'react'
import "../design/postList.css"
import Post from './Post'

const PostList = ({posts}) => {
    
    return (
        <div className="posts">
            {posts && posts.map((post, index) => <Post key={index} post={post}></Post>).reverse() }
        </div>
    )
}

export default PostList