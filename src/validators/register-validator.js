

export default class RegisterValidator {
    static validate(values) {
        let errors = {};

        if (values.password != values.rePassword) {
            errors.rePassword = 'Passwords don\'t match';
        }

        return errors;
    }
}
