import React from "react";
import classes from "./BurgerIngredient.css"
import PropTypes from "prop-types";

class BurgerIngredient extends React.Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ("bread-bottom"):
                // ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ("bread-top"):
                // ingredient = (
                //     <div className={classes.BreadTop}>
                //         <div className={classes.Seeds1}></div>
                //         <div className={classes.Seeds2}></div>
                //         <div className={classes.Seeds3}></div>
                //     </div>
                // );
                break;
            case ("dutchoven"):
                // ingredient = <div className={classes.DutchOven}></div>;
                ingredient = (
                    <div>
                        <div className={classes.DutchOvenLid}></div>
                        <div className={classes.DutchOvenHandle}></div>
                        <div className={classes.DutchOven}></div>

                    </div>
                );
                break;
            case ("braiser"):
                // ingredient = <div className={classes.Braiser}></div>;
                ingredient = (
                    <div>
                        <div className={classes.BraiserOvenLid}></div>

                        <div className={classes.Braiser}>
                            <div className={classes.BraiserHandle}></div>
                        </div>

                    </div>
                );
                break;
            case ("skillet"):
                // ingredient = <div className={classes.Skillet}></div>;
                ingredient = (
                    <div>
                        <div className={classes.Skillet}><div className={classes.SkilletHandle}></div></div>
                    </div>
                );
                break;
            case ("casserole"):
                // ingredient = <div className={classes.Casserole}></div>;
                ingredient = (
                    <div>
                        <div className={classes.CasseroleHandle}></div>
                        <div className={classes.Casserole}></div>

                    </div>
                );
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;