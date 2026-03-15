const TextField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    placeHolder, 
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="font-semibold text-md">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeHolder}
                className={`${className ?? ""} font-semibold text-md`}
                {...register(id, {
                    required: { value: required, message },
                    minLength: min
                        ? { value: min, message: `Minimum ${min} characters required` }
                        : undefined,
                    pattern:
                        type === "email"
                            ? {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address",
                              }
                            : undefined,
                })}
            />
            {errors[id]?.message && (
                <p className="text-sm font-semibold text-red-600 mt-0">
                    {errors[id].message}*
                </p>
            )}
        </div>
    );
};

export default TextField;