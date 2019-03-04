import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DivLink = ({ children, classes, to }) => (
    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
        {children}
    </Link>
);

DivLink.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

export default DivLink;
