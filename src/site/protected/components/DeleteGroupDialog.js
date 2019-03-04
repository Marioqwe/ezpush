import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Clear from '@material-ui/icons/Clear';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

const styles = {
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    dialogContentElement: {
        alignSelf: 'center',
        textAlign: 'center',
    }
};

class DeleteGroupDialog extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        completed: PropTypes.bool.isRequired,
        deleteGroup: PropTypes.func.isRequired,
        isWaiting: PropTypes.bool.isRequired,
        group: PropTypes.shape({
            gid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
    };

    state = {
        checked: false,
        open: false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.completed !== this.props.completed
            && this.props.completed) {
            this.handleClose();
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleDeleteGroup = () => {
        const { deleteGroup, group } = this.props;
        deleteGroup(group.gid);
    };

    handleCheckBoxChange = () => {
        this.setState({ checked: !this.state.checked, });
    };

    render() {
        const { classes, group, isWaiting } = this.props;
        const { checked, open } = this.state;
        return(
            <React.Fragment>
                <Button size="small" onClick={this.handleClickOpen}>
                    <Clear />
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>
                        {`Delete ${group.name}?`}
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <DialogContentText className={classes.dialogContentElement}>
                            This will remove all configured features for this group. You will not be able to undo this action.
                        </DialogContentText>
                        <FormControlLabel
                            className={classes.dialogContentElement}
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={this.handleCheckBoxChange}
                                    color="primary"
                                />
                            }
                            label="I understand and want to delete this group"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={!checked || isWaiting}
                            onClick={this.handleDeleteGroup}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(DeleteGroupDialog);
