import {Component, Mixins} from "vue-property-decorator";
import {Validation as Validation_} from "vuelidate";


@Component
export default class Validation extends Mixins() {
    getFieldState(field: Validation_): boolean | null {
        if (!field.$dirty) return null

        return !field.$error
    }

    getValidationMessage(field: Validation_): string {
        // @ts-ignore
        if (field.$params.required && !field.required) return 'Поле обязательно для заполнения'
        // @ts-ignore
        else if (field.$params.email && !field.email) return 'Не верный формат почты'
        // @ts-ignore
        else if (field.$params.minValue && !field.minValue) return `Значение должно быть больше чем ${field.$params.minValue.min}`
        else return ''
    }
}
