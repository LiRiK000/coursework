import { Input } from 'antd';
import { memo } from 'react';

const { Search } = Input;

interface SearchCoursesProps {
  disabled: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
  onClear: () => void;
}

export const SearchCourses = memo(
  ({ disabled, value, onChange, onSearch, onClear }: SearchCoursesProps) => {
    return (
      <Search
        placeholder="Поиск курсов"
        size="large"
        allowClear
        onClear={onClear}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        style={{ width: '100%', marginBottom: '24px' }}
      />
    );
  },
);
