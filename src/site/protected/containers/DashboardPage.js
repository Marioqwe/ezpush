import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { HTTPComponent } from 'lib/api-middleware/http-component/index';
import Page from 'common/containers/Page';
import GroupFormDialog from '../components/GroupFormDialog';
import GroupCard from '../components/GroupCard';
import { createGroup } from '../redux/actions';

const styles = theme => ({
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 3,
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const DashboardPage = ({
    classes,
    groups,
    match,
}) => (
    <Page title="Dashboard" location={match.url}>
        <div className={classNames(classes.layout)}>
            <div className={classes.title}>
                <Typography gutterBottom variant="h5">
                    Groups
                </Typography>
                <HTTPComponent
                    uid="GroupFormDialog"
                    component={GroupFormDialog}
                    request={{ createGroup }}
                />
            </div>
            <div className={classNames(classes.cardGrid)}>
                <Grid container spacing={40}>
                    {groups && Object.keys(groups).map((key) => {
                        const group = groups[key];
                        return (
                            <Grid item key={key} sm={6} md={4} lg={3}>
                                <GroupCard group={group} />
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </div>
    </Page>
);

DashboardPage.propTypes = {
    classes: PropTypes.object.isRequired,
    groups: PropTypes.shape({
        desc: PropTypes.string,
        gid: PropTypes.string,
        name: PropTypes.string,
    }),
    match: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    groups: state.groups,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(DashboardPage));
