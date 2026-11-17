import { useRef, useState } from 'react';
import { UploadCloud, Trash2, Eye, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { checkFile, FILE_RULES } from '../utils/validation.js';
import { fileSize } from '../utils/format.js';

const toDataUrl = (file) => new Promise((res, rej) => {
  const fr = new FileReader();
  fr.onload = () => res(fr.result);
  fr.onerror = rej;
  fr.readAsDataURL(file);
});

export default function FileUpload({ label, name, value, onChange, error, hint }) {
  const inputRef = useRef(null);
  const [localError, setLocalError] = useState('');
  const [drag, setDrag] = useState(false);
  const shown = localError || error;
  const id = `f-${name}`;

  const accept = async (file) => {
    if (!file) return;
    const problem = checkFile(file);
    if (problem) { setLocalError(problem); return; }
    setLocalError('');
    try {
      const dataUrl = await toDataUrl(file);
      onChange(name, { name: file.name, size: file.size, type: file.type, dataUrl });
    } catch {
      setLocalError('Could not read this file. Try again.');
    }
  };

  const remove = () => { onChange(name, null); setLocalError(''); if (inputRef.current) inputRef.current.value = ''; };

  const preview = async () => {
    if (!value?.dataUrl) return;
    const blob = await (await fetch(value.dataUrl)).blob();
    window.open(URL.createObjectURL(blob), '_blank', 'noopener');
  };

  return (
    <div className={`field upload ${shown ? 'has-error' : ''}`}>
      <span className="label" id={`${id}-l`}>{label}<span className="req" aria-hidden="true"> *</span></span>
      {value ? (
        <div className="file-card">
          {value.type.startsWith('image/') && value.dataUrl
            ? <img src={value.dataUrl} alt={`Preview of ${value.name}`} />
            : <div className="file-ico"><FileText size={24} aria-hidden="true" /></div>}
          <div className="file-meta">
            <p className="file-name" title={value.name}>{value.name}</p>
            <p className="file-sub"><CheckCircle2 size={14} aria-hidden="true" />{fileSize(value.size)} · ready</p>
          </div>
          <div className="file-actions">
            {value.dataUrl && <button type="button" className="icon-btn" onClick={preview} aria-label={`Preview ${value.name}`}><Eye size={18} /></button>}
            <button type="button" className="icon-btn danger" onClick={remove} aria-label={`Remove ${value.name}`}><Trash2 size={18} /></button>
          </div>
        </div>
      ) : (
        <label
          className={`dropzone ${drag ? 'drag' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); accept(e.dataTransfer.files?.[0]); }}
        >
          <input ref={inputRef} id={id} name={name} type="file" accept=".pdf,.jpg,.jpeg,.png" aria-labelledby={`${id}-l`} aria-invalid={!!shown} aria-describedby={`${id}-d`} onChange={(e) => accept(e.target.files?.[0])} />
          <UploadCloud size={22} aria-hidden="true" />
          <span><b>Choose a file</b> or drag it here</span>
          <small>{FILE_RULES.label}</small>
        </label>
      )}
      {shown
        ? <p id={`${id}-d`} className="err" role="alert"><AlertCircle size={14} aria-hidden="true" />{shown}</p>
        : hint && <p id={`${id}-d`} className="hint">{hint}</p>}
    </div>
  );
}
