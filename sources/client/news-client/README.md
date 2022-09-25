### Create app

npx create-react-app news-client

## package:

### install material-ui

npm i @material-ui/core
npm install @material-ui/icons

npm i --save-dev node-sass
npm i --save react-router-dom

---

## Extensions

Reactjs code snippets
JavaScript (ES6) code snippets
SCSS Formatter
Rainbow Brackets
ESLint

## Font Family

https://github.com/tonsky/FiraCode

---

## Code snippets:

rsfp→ stateless named function with prop types skeleton

## Clean code:

Alt + Shift + o

---

Templates Component

```


import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlogSectionShortListItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

BlogSectionShortListItem.propTypes = {};

BlogSectionShortListItem.defaultProps = {};

function BlogSectionShortListItem(props) {
return <div className={cx('wrapper')}></div>;
}

export default BlogSectionShortListItem;



```
