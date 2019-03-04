import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const GroupActionsList = ({ classes }) => (
    <div className={classes.root}>
        <List subheader={<ListSubheader>Actions</ListSubheader>}>
            <ListItem button>
                <ListItemText primary="Interventions" />
            </ListItem>
            <ListItemLink href="#simple-list">
                <ListItemText primary="Participants" />
            </ListItemLink>
            <ListItemLink href="#simple-list">
                <ListItemText primary="Rules" />
            </ListItemLink>
        </List>
    </div>
);

GroupActionsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupActionsList);
