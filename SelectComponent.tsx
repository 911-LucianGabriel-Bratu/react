import { ChangeEvent } from 'react';

interface IOwnProps {
  filterValues: string[];
  label: string;
  onChangeValueFilter: (values: string[]) => void;
}

export default function SelectComponent(props: IOwnProps) {
  const { filterValues, label, onChangeValueFilter } = props;

  return (
    <div>
      <label htmlFor={`filterSelect-${label}`}>{`${label}:`}</label>
      <select
        id={`filterSelect-${label}`}
        style={{ width: '10em' }}
        multiple
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onChangeValueFilter(
            Array.from(event.target.selectedOptions).map(
              (option) => option.value
            )
          )
        }
      >
        {filterValues.map((value: string) => {
          return <option value={value}>{value}</option>;
        })}
      </select>
    </div>
  );
}
