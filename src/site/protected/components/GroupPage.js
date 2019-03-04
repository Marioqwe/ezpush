import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Page from 'common/containers/Page';
import GroupActionsList from './GroupActionsList';

const styles = theme => ({
    content: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '70%',
    },
    actionList: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});

const GroupPage = ({ classes, match }) => {
    return (
        <Page title="Groups" location={match.url}>
            <div className={classes.wrapper}>
                <Paper className={classes.content} elevation={1}>
                    Group Page: {match.params.gid}
                </Paper>
                <div className={classes.actionList}>
                    <GroupActionsList />
                </div>
            </div>
        </Page>
    );
};

export default withStyles(styles)(GroupPage);
