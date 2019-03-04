import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class GroupFormDialog extends React.Component {
    static propTypes = {
        createGroup: PropTypes.func.isRequired,
        completed: PropTypes.bool.isRequired,
        isWaiting: PropTypes.bool.isRequired,
    };

    state = {
        open: false,
        groupName: '',
        groupDescription: '',
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { completed } = this.props;
        if (!prevProps.completed && completed) {
            this.handleClose();
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCreate = (event) => {
        const { createGroup } = this.props;
        const { groupName, groupDescription } = this.state;
        createGroup(groupName, groupDescription);
    };

    handleFieldChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    };

    isCreateButtonActive = () => {
        const { groupName } = this.state;
        const { isWaiting } = this.props;
        return groupName && !isWaiting;
    };

    render() {
        const { groupName, groupDescription } = this.state;
        const disabled = !this.isCreateButtonActive();
        return (
            <React.Fragment>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    New Group
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="form-dialog-title">
                        Create a Group
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="groupName"
                            label="Name"
                            type="text"
                            value={groupName}
                            onChange={this.handleFieldChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="groupDescription"
                            label="Description"
                            type="text"
                            value={groupDescription}
                            onChange={this.handleFieldChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.handleCreate} color="primary" disabled={disabled}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default GroupFormDialog;
