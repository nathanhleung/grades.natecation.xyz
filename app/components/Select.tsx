import { identity } from "lodash";
import ReactSelect from "react-select";
import { UCLA_BLUE_RGB, UCLA_LIGHTEST_BLUE_RGB } from "../constants";

type ReactSelectProps = React.ComponentProps<typeof ReactSelect>;
type SelectProps = Omit<ReactSelectProps, "styles" | "value" | "options" | "onChange"> & {
    /** The currently selected value */
    value: string;
    /**
     * A function to get the label of the given value;
     * defaults to the identity.
     */
    getLabel?(value: string): string;
    /** Called when the selected value changes */
    onChange(newValue: string): void;
    /** The options to select from */
    options: string[];
};

/**
 * Simplified select component based on the base `<Select/>` from
 * `react-select`.
 */
const Select = ({ value, getLabel = identity, onChange, options, ...restProps }: SelectProps) => {
    const selectStyles: ReactSelectProps["styles"] = {
        control(base, { isFocused }) {
            return {
                ...base,
                boxShadow: "none",
                borderWidth: "2px",
                borderColor: isFocused
                    ? `rgb(${UCLA_BLUE_RGB})`
                    : "none",
                ":hover": {
                    borderColor: `rgb(${UCLA_BLUE_RGB})`,
                },
            };
        },
        option(base, { isFocused, isSelected }) {
            return {
                ...base,
                cursor: 'pointer',
                color: isSelected ? "white" : "black",
                background: isSelected
                    ? `rgb(${UCLA_BLUE_RGB})`
                    : isFocused
                        ? `rgb(${UCLA_LIGHTEST_BLUE_RGB})`
                        : "white",
            };
        }
    };

    const selectOptions = options.map((option) => ({
        value: option,
        label: getLabel(option),
    }));

    const selectValue = {
        label: getLabel(value),
        value,
    }

    return (
        <ReactSelect
            isSearchable={false}
            value={selectValue}
            onChange={(newSelectValue) => {
                if (
                    newSelectValue &&
                    typeof newSelectValue === 'object' &&
                    'value' in newSelectValue
                ) {
                    const newValue = newSelectValue.value;
                    if (typeof newValue === 'string') {
                        onChange(newValue);
                    }
                } else {
                    onChange('');
                }
            }}
            options={selectOptions}
            styles={selectStyles}
            {...restProps}
        />
    )
}

export { Select };
