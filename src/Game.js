import React from 'react';
import validators from './validators';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { numberOfPeople: null };
        this.validators = validators;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateValidators = this.updateValidators.bind(this);
        this.displayValidationErrors = this.displayValidationErrors.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.generateResult = this.generateResult.bind(this);
    }

    updateValidators(fieldName, value) {
        this.validators[fieldName].errors = [];
        this.validators[fieldName].state = value;
        this.validators[fieldName].valid = true;
        this.validators[fieldName].rules.forEach((rule) => {
            if (!rule.regex.test(value)) {
                this.validators[fieldName].errors.push(rule.message);
                this.validators[fieldName].valid = false;
            }
        });
    }

    displayValidationErrors(fieldName) {
        const validator = this.validators[fieldName];
        const result = '';
        if (validator && !validator.valid) {
            const errors = validator.errors.map((info, index) => {
                return <span className="error" key={index}>* {info}</span>;
            });

            return (
                <div>
                    {errors}
                </div>
            );
        }
        return result;
    }

    generateResult() {
        let arr = [];

        for (let i = 0; i < 4; i++) {
            let symbol = '';
            
            if (i === 0) {
                symbol = 'S';
            } else if (i === 1) {
                symbol = 'H';
            } else if (i === 2) {
                symbol = 'D';
            } else {
                symbol = 'C';
            }

            for (let j = 1; j <= 13; j++) {
                let str = symbol + '-';

                if (j === 1) {
                    str += 'A';
                } else if (j === 10) {
                    str += 'X';
                } else if (j === 11) {
                    str += 'J';
                } else if (j === 12) {
                    str += 'Q';
                } else if (j === 13) {
                    str += 'K';
                } else {
                    str += j;
                }

                arr.push(str);
            }
        }
        const numOfPlayer = parseInt(this.validators.numberOfPeople.state);
        let display = [];
        for (let i = 0; i < numOfPlayer; i++) {
            let cardIdx = i;
        
            let result = '';

            while(cardIdx < 52) {
                if (cardIdx >= numOfPlayer) result += ',';
                let idx = Math.floor(Math.random() * arr.length);
                result += arr[idx];
                arr.splice(idx, 1);
                cardIdx += numOfPlayer;
            }
            display.push(result);
        }
        return (
            <div>
                {display.map((info, index) => { return <div key={index}>{info}</div>; })}
            </div>
        );
    }

    isFormValid() {
        let status = true;
        Object.keys(this.validators).forEach((field) => {
            if (!this.validators[field].valid) {
                status = false;
            }
        });
        return status;
    }

    handleChange(event, inputPropName) {
        const newState = Object.assign({}, this.state);
        newState[inputPropName] = event.target.value;
        this.setState(newState);
        this.updateValidators(inputPropName, event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.isFormValid()) {
            return;
        }

        this.setState({ showResults: true });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Number of Player:
                    <input type="text" name="numberOfPeople" onChange={event => this.handleChange(event, 'numberOfPeople')} />
                </label>
                { this.displayValidationErrors('numberOfPeople') }
                <input type="submit" value="Submit" />
                { this.state.showResults ? this.generateResult() : null }
            </form>
        )
    }
}
export default Game;