import './index.scss';
import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setPosts } from "../../redux";
import getPosts from "../../services/getPosts";


export default connect(
    state => ({ posts: state.posts }),
    { setPosts }
)(function ({ posts, setPosts }) {
    const [sql, setSql] = useState('');
    async function execute() {
        setPosts(await getPosts(sql));
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <textarea value={sql} onChange={e => setSql(e.target.value)} style={{ width: '100%', height: '50px' }} placeholder="SQL запрос" />
            <br />
            <button onClick={execute}>Выполнить</button>
            <br />
            {
                posts.map(post => (
                    <div key={post.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', background: "#fff" }}>
                        {JSON.stringify(post)}
                    </div>
                ))
            }
        </div>
    );
});
