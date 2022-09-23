import React from 'react';
import { useParams } from 'react-router-dom';

BlogDetailPage.propTypes = {};

function BlogDetailPage(props) {
    const { blogId } = useParams();
    return <div>BlogDetailPage: {blogId}</div>;
}

export default BlogDetailPage;
