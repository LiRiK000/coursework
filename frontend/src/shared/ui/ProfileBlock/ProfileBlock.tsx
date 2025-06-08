import { Input, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { useClickOutside } from '@shared/hooks';
import classes from './ProfileBlock.module.scss';

type ProfileBlockProps = {
  title: string;
  value: string;
  onSave: (newValue: string) => void;
  disabled?: boolean;
};

export const ProfileBlock = ({
  title,
  value,
  onSave,
  disabled = false,
}: ProfileBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    onSave(editedValue);
    setIsEditing(false);
  };

  useClickOutside(containerRef, handleSave, isEditing);

  const handleEditClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${classes.blockContainer} ${disabled ? classes.disabled : ''}`}
      role="button"
      onClick={handleEditClick}
    >
      <Typography.Text type="secondary">{title}</Typography.Text>
      {isEditing ? (
        <div className={classes.editWrapper}>
          <Input
            className={classes.editInput}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            disabled={disabled}
          />
        </div>
      ) : (
        <div>
          <div className={classes.valueWrapper}>
            <Typography.Text className={classes.valueText}>
              {value}
            </Typography.Text>
            {!disabled && (
              <EditOutlined
                style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '16px' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
