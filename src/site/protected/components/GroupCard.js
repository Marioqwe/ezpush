import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { HTTPComponent } from 'lib/api-middleware/http-component/index';
import DivLink from 'common/components/DivLink';
import DeleteGroupDialog from './DeleteGroupDialog';
import { deleteGroup } from '../redux/actions';

const styles = {
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMenu: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
    },
};

const GroupCard = (props) => {
    const { classes, group } = props;
    return (
        <Card className={classes.card}>
            <CardActions className={classes.cardMenu}>
                <HTTPComponent
                    group={group}
                    uid="DeleteGroupDialog"
                    component={DeleteGroupDialog}
                    request={{ deleteGroup }}
                />
            </CardActions>
            <CardActionArea>
                <DivLink to={`/groups/${group.gid}/`}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {group.name}
                        </Typography>
                    </CardContent>
                </DivLink>
            </CardActionArea>
        </Card>
    );
};

GroupCard.propTypes = {
    classes: PropTypes.object.isRequired,
    group: PropTypes.shape({
        description: PropTypes.string,
        gid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default withStyles(styles)(GroupCard);
