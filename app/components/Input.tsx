import classNames from "classnames";
import { forwardRef, JSX } from "react";

type InputProps = JSX.IntrinsicElements["input"];

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...restProps },
  ref
) {
  return (
    <input
      ref={ref}
      className={classNames(
        "p-4 outline-none text-center text-2xl text-black",
        "font-bold shadow-lg disabled:bg-white rounded transition-all border-uclaBlue border-b-8 focus:border-uclaGold hover:shadow-2xl",
        className
      )}
      {...restProps}
    />
  );
});

export { Input };
