# คู่มือเพิ่มระบบ Preset ใน WheelGame

## สิ่งที่ต้องแก้ไข

### 1. เพิ่ม Import ไอคอน (บรรทัด 3)
```typescript
// เดิม
import { RefreshCw, X, Hand, Settings } from 'lucide-react';

// แก้เป็น
import { RefreshCw, X, Hand, Settings, Save, Check } from 'lucide-react';
```

### 2. เพิ่ม Storage Keys ก่อน Component (หลังบรรทัด 6)
```typescript
const STORAGE_KEYS = {
  PRESET_1: 'wheelgame_custom_preset_1',
  PRESET_2: 'wheelgame_custom_preset_2',
  PRESET_3: 'wheelgame_custom_preset_3',
};
```

### 3. เพิ่ม State สำหรับ Preset (หลังบรรทัด 21 - หลัง customInputs)
```typescript
const [selectedPreset, setSelectedPreset] = useState<1 | 2 | 3>(1);
const [saveSuccess, setSaveSuccess] = useState(false);
```

### 4. เพิ่ม Functions สำหรับจัดการ Preset (หลังบรรทัด 45 - หลัง SLICE_ANGLE)
```typescript
// ==========================================
// Preset Management Functions
// ==========================================
const getStorageKey = (preset: 1 | 2 | 3): string => {
  return preset === 1 ? STORAGE_KEYS.PRESET_1 :
         preset === 2 ? STORAGE_KEYS.PRESET_2 :
         STORAGE_KEYS.PRESET_3;
};

const loadPreset = (preset: 1 | 2 | 3) => {
  try {
    const key = getStorageKey(preset);
    const saved = localStorage.getItem(key);
    if (saved) {
      const data = JSON.parse(saved);
      setCustomInputs(data);
    } else {
      setCustomInputs(Array(8).fill(''));
    }
  } catch (error) {
    console.error('Error loading preset:', error);
    setCustomInputs(Array(8).fill(''));
  }
};

const savePreset = () => {
  try {
    const key = getStorageKey(selectedPreset);
    localStorage.setItem(key, JSON.stringify(customInputs));

    // Show success feedback
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  } catch (error) {
    console.error('Error saving preset:', error);
    alert('ไม่สามารถบันทึกได้ กรุณาลองใหม่');
  }
};

const handlePresetSelect = (preset: 1 | 2 | 3) => {
  setSelectedPreset(preset);
  loadPreset(preset);
};
```

### 5. แก้ไข useEffect เพื่อโหลด Preset ตอนเริ่มต้น (บรรทัด 47-51)
```typescript
// เดิม
useEffect(() => {
  handleModeSelect('FUN');
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// แก้เป็น
useEffect(() => {
  handleModeSelect('FUN');
  loadPreset(1); // Load preset 1 by default
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

### 6. เพิ่ม UI สำหรับ Preset Selector ในส่วน Custom Mode (ในบรรทัด 398-426)

หาส่วนนี้:
```typescript
{/* Custom Mode */}
<div className="border-t border-slate-700 pt-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-bold text-white flex items-center gap-2">
      <Settings size={18} /> กำหนดเอง (Custom)
    </h3>
    <div className="text-xs text-slate-400">ใส่ได้สูงสุด 8 ข้อ</div>
  </div>
```

เพิ่มส่วนนี้หลังจาก `</div>` ของ header:
```typescript
  {/* Preset Selector */}
  <div className="flex gap-2 mb-4">
    {([1, 2, 3] as const).map((preset) => (
      <button
        key={preset}
        onClick={() => handlePresetSelect(preset)}
        className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
          selectedPreset === preset
            ? 'bg-blue-600 text-white shadow-lg scale-105'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        Preset {preset}
      </button>
    ))}
  </div>
```

### 7. เพิ่มปุ่ม Save Preset ก่อนปุ่ม "เริ่มเกมแบบกำหนดเอง"

หาบรรทัดนี้:
```typescript
<button
  onClick={saveCustomMode}
  className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95"
>
  เริ่มเกมแบบกำหนดเอง
</button>
```

เพิ่มปุ่ม Save ก่อนมัน:
```typescript
{/* Save Button */}
<button
  onClick={savePreset}
  className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all mb-3 flex items-center justify-center gap-2 ${
    saveSuccess
      ? 'bg-green-600 text-white'
      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
  }`}
>
  {saveSuccess ? (
    <>
      <Check size={18} />
      บันทึกสำเร็จ!
    </>
  ) : (
    <>
      <Save size={18} />
      บันทึก Preset {selectedPreset}
    </>
  )}
</button>

{/* Start Game Button */}
<button
  onClick={saveCustomMode}
  className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95"
>
  เริ่มเกมแบบกำหนดเอง
</button>
```

### 8. แก้ไข className ของ space-y (บรรทัดประมาณ 406)
```typescript
// เดิม
<div className="space-y-2 mb-4">

// แก้เป็น
<div className="space-y-2 mb-3">
```

## สรุปฟีเจอร์ที่ได้

1. **3 Preset Slots** - ผู้ใช้สามารถเลือก Preset 1, 2, 3 ได้
2. **ปุ่ม Save** - บันทึกข้อมูล custom ลง localStorage ตาม Preset ที่เลือก
3. **Auto Load** - โหลดข้อมูลอัตโนมัติเมื่อเปลี่ยน Preset
4. **Success Feedback** - แสดงข้อความ "บันทึกสำเร็จ!" พร้อมไอคอน Check เป็นเวลา 2 วินาที
5. **Local Storage** - จดจำข้อมูลเฉพาะเครื่องของผู้ใช้

## วิธีใช้งาน

1. เปิดโหมด Custom
2. เลือก Preset 1, 2 หรือ 3
3. กรอกข้อมูลลงใน input fields
4. กดปุ่ม "บันทึก Preset X"
5. ข้อมูลจะถูกเซฟไว้ใน localStorage
6. ครั้งต่อไปที่เลือก Preset นั้น ข้อมูลจะโหลดขึ้นมาอัตโนมัติ
