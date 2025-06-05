type MicSelectorProps = {
  devices: MediaDeviceInfo[];
  selectedDeviceId: string | null;
  setSelectedDeviceId: (id: string) => void;
};

const MicSelector = ({ devices, selectedDeviceId, setSelectedDeviceId }: MicSelectorProps) => (
  <div className="mb-4">
    <label htmlFor="device-select" className="block mb-2 font-bold">
      使用するマイクを選択:
    </label>
    <select
      id="device-select"
      value={selectedDeviceId || ''}
      onChange={(e) => setSelectedDeviceId(e.target.value)}
      className="border px-2 py-1 rounded"
    >
      {devices.map((device) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label || `マイク ${device.deviceId}`}
        </option>
      ))}
    </select>
  </div>
);

export default MicSelector;