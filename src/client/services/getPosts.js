import { postResource } from './api';

export default async (sql) => {
    return await postResource(`/posts`, { sql });
}
