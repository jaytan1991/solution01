const validator = {
    numberOfPeople: {
        rules: [
            {
                regex: /^\-?(0|[1-9]\d*)$/,
                message: 'Not a valid number of player',
            }
        ],
        errors: [],
        valid: false,
        state: '',
    }
};

export default validator;