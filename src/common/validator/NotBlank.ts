import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function NotBlank(
  property?: string,
  validationOptions: ValidationOptions = {}
) {
  /*
  console.log('NotBlank-------->')
  console.log({
    '----': 'entry',
    property,
    validationOptions
  })
*/
  return function (object: Object, propertyName: string) {
    /*
    console.log({
      '----': 'callback',
      object,
      propertyName
    })
*/
    validationOptions.message =
      validationOptions.message ?? `${propertyName} should not be blank`;
    registerDecorator({
      name: "NotBlank",
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          /*
          console.log({
            '----': 'validator',
            value,
            args
          })
*/
          return typeof value === "string" && value.trim().length > 0;
        },
      },
    });
  };
}
