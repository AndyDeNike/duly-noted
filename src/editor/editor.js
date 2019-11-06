import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            title: '',
            id: ''
        };
    }

    componentDidMount = () => {
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        });
    }

    render() {

        const { classes } = this.props;

        return(
            <div className={classes.editorContainer}>
                <ReactQuill 
                    //string of html == value 
                    value={this.state.text} 
                    onChange={this.updateBody}>
                </ReactQuill>
            
            </div>
        );
    }

    updateBody = async (val) => {
        await this.setState({ text: val });
        this.update(); 
    };

    update = debounce(() => {
        console.log('UPDATING DB');
        //come back later
    }, 1500);
}
// this.props.classes.classname
export default withStyles(styles)(EditorComponent);