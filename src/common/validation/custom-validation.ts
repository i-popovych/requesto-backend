import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsDateNowOrFuture', async: false })
export class IsDateNowOrFuture implements ValidatorConstraintInterface {
  validate(expectedCloseDate: string) {
    const inputDate = new Date(expectedCloseDate);
    const today = new Date();
    const oneDayAgo = new Date(today);
    oneDayAgo.setDate(today.getDate() - 1);

    return inputDate > oneDayAgo;
  }

  defaultMessage(): string {
    return 'Expected close date must be now or in the future';
  }
}

@ValidatorConstraint({ name: 'IsHourMinute', async: false })
export class IsHourMinuteConstraint implements ValidatorConstraintInterface {
  validate(time: any): boolean {
    // Regular expression to match "HH:MM" 24-hour format
    const hourMinuteRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    // Check if the string matches the regex
    return typeof time === 'string' && hourMinuteRegex.test(time);
  }

  defaultMessage(): string {
    return 'Time must be a string in the valid 24-hour format (HH:MM)';
  }
}

export const IsHourMinute = (validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsHourMinuteConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'IsStrictDecimalBetween', async: false })
export class IsStrictDecimalBetweenConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments): boolean {
    const [min, max] = args.constraints;
    return (
      typeof value === 'number' &&
      value > min &&
      value < max &&
      !Number.isInteger(value) // Ensure it's a decimal, not an integer
    );
  }

  defaultMessage(args: ValidationArguments): string {
    const [min, max] = args.constraints;
    return `${args.property} must be a decimal greater than ${min} and less than ${max}.`;
  }
}

/**
 *
 * @param min Minimum Value
 * @param max Maximum Value
 * @param validationOptions
 * @returns
 */
export const IsStrictDecimalBetween = (
  min: number,
  max: number,
  validationOptions?: ValidationOptions,
) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [min, max],
      validator: IsStrictDecimalBetweenConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'IsStringOrObject', async: false })
export class IsStringOrObjectConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean {
    return typeof value === 'string' || typeof value === 'object';
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be either a string or an object.`;
  }
}

/**
 * Custom decorator to validate that a value is either a string or an object.
 * @param validationOptions Optional validation options
 * @returns Property decorator
 */
export const IsStringOrObject = (validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsStringOrObjectConstraint,
    });
  };
};
