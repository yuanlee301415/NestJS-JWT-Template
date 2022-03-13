import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function NotBlank(
  property?: string,
  validationOptions: ValidationOptions = {}
) {
  return function (object: Object, propertyName: string) {
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
          return typeof value === "string" && value.trim().length > 0;
        },
      },
    });
  };
}
