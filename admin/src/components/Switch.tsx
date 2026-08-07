interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export function Switch({ checked, onChange, disabled, label }: SwitchProps) {
  return (
    <label className="txi-switch-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span className="txi-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span className="track" />
        <span className="thumb" />
      </span>
      {label && <span className="txi-switch-caption">{label}</span>}
    </label>
  );
}
