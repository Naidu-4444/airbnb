import { CircleMinus, CirclePlus } from "lucide-react";
import { useCallback } from "react";

const Counterinput = ({ value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onSub = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex items-center gap-4">
      <div
        onClick={onSub}
        className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
      >
        <CircleMinus />
      </div>
      <div className="text-lg font-bold px-4 py-2 border rounded bg-white text-black">
        {value}
      </div>

      <div
        onClick={onAdd}
        className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
      >
        <CirclePlus />
      </div>
    </div>
  );
};

export default Counterinput;
