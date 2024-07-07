import React from 'react';
import { Modal, Backdrop, Fade, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
    },
}));

const ImageModal = ({ open, handleClose, title, content }) => {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" id="transition-modal-title">{title}</Typography>
                    <Typography variant="body1" id="transition-modal-description">{content}</Typography>
                </Paper>
            </Fade>
        </Modal>
    );
};

export default ImageModal;
