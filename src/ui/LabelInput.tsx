import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface LabelInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  label: string;
  inputName: string;
  options?: RegisterOptions<FieldValues, string>;
  type?: string;
}

function LabelInput({ id, register, errors, label, inputName, options, type }: LabelInputProps) {
  return (
    <div className="flex flex-col gap-y-1.5 items-start">
      <div className="flex gap-x-1 justify-between w-full">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {errors[inputName] && (
          <p className="text-red-500 text-xs">{errors[inputName].message as string}</p>
        )}
      </div>
      <input
        id={id}
        className="border px-4 py-2.5 rounded-md w-80"
        type={type}
        {...register(inputName, options)}
      />
    </div>
  );
}

export default LabelInput;
