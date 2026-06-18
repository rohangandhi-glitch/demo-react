import { useRef } from 'react'
import { Upload, FileCsv } from './Icons'

// CSV upload dropzone: an Upload button + the chosen file name.
export default function UploadField({ fileName, onFile }) {
  const inputRef = useRef(null)

  return (
    <div className="upload-dropzone">
      <button
        type="button"
        className="upload-btn"
        onClick={() => inputRef.current?.click()}
      >
        <Upload size={14} />
        <span>Upload</span>
      </button>
      {fileName && (
        <span className="upload-file">
          <FileCsv size={14} className="file-icon" />
          {fileName}
        </span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        hidden
        onChange={(e) => onFile?.(e.target.files?.[0]?.name || '')}
      />
    </div>
  )
}
