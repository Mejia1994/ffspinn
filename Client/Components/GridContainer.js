import {Grid} from "semantic-ui-react";

const GridContainer = function (props) {
    return (
        <Grid stackable columns={1} centered>
            <Grid.Column width={8}>
                {props.children}
            </Grid.Column>
        </Grid>
    );
}
export default GridContainer;