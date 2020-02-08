import { createStore } from 'redux';

export const setPosts = (posts) => ({
    type: 'setPosts',
    posts: posts
});

export const store = createStore(
    (state, action) => {
        if (action.type == 'setPosts') {
            return {
                ...state,
                posts: action.posts
            };
        }
        return state;
    },
    {
        posts: []
    }
);
