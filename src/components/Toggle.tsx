interface ToggleProps {
  isChecked: boolean;
  onToggle: () => void;
  label?: string;
}

const Toggle = ({ isChecked, onToggle, label }: ToggleProps) => {
  return (
    <div className="flex items-center gap-3">
      {/* Conditionally render the label if provided */}
      {label && <label className="text-lg">{label}</label>}
      <button
        onClick={onToggle}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          isChecked ? 'bg-green-500' : 'bg-gray-500'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transform transition ${
            isChecked ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
