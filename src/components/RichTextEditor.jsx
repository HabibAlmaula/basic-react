import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor({ value, onChange, formatedValue }) {
  const [textareaHeight, setTextareaHeight] = useState('auto');

  const handleOnChange = (content) => {
    onChange({ plainText: content });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'bullet',
    'blockquote', 'code-block',
    'link'
  ];

  const customStyles = `
    .quill {
      background: white;
    }
    .ql-container {
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      background: white;
    }
    .ql-toolbar {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      background: #f8fafc;  /* Light gray background */
      border-bottom: 1px solid #e2e8f0;
    }
    .ql-editor {
      min-height: 120px;
    }
    
    /* Toolbar button styling */
    .ql-snow.ql-toolbar button {
      padding: 4px 8px;
      border-radius: 0.25rem;
    }
    
    .ql-snow.ql-toolbar button:hover {
      background-color: #f1f5f9;
    }
    
    .ql-snow.ql-toolbar button.ql-active {
      background-color: #e2e8f0;
    }
    
    /* Toolbar dropdown styling */
    .ql-snow .ql-picker {
      color: #475569;
    }
    
    .ql-snow .ql-picker-options {
      border-color: #e2e8f0;
      border-radius: 0.375rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    /* Icon colors */
    .ql-snow .ql-stroke {
      stroke: #475569;
    }
    
    .ql-snow .ql-fill {
      fill: #475569;
    }
    
    .ql-snow.ql-toolbar button:hover .ql-stroke {
      stroke: #1e293b;
    }
    
    .ql-snow.ql-toolbar button:hover .ql-fill {
      fill: #1e293b;
    }
    
    .ql-snow.ql-toolbar button.ql-active .ql-stroke {
      stroke: #1e293b;
    }
    
    .ql-snow.ql-toolbar button.ql-active .ql-fill {
      fill: #1e293b;
    }
    
    /* Tooltip styling */
    .ql-snow .ql-tooltip {
      background-color: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 8px 12px;
    }
    
    .ql-snow .ql-tooltip input[type=text] {
      border: 1px solid #e2e8f0;
      border-radius: 0.25rem;
      padding: 4px 8px;
      outline: none;
    }
    
    .ql-snow .ql-tooltip input[type=text]:focus {
      border-color: #94a3b8;
      box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.1);
    }
  `;

  return (
    <div className="w-full grid grid-cols-1 gap-5 mb-10">
      <style>{customStyles}</style>
      <div 
        onDrop={(e) => e.preventDefault()} 
        className="bg-white rounded-lg border border-slate-200"
      >
        <ReactQuill
          theme="snow"
          onChange={handleOnChange}
          value={value}
          modules={modules}
          formats={formats}
          bounds={'.app'}
          placeholder={'Type something here...'}
        />
      </div>
    </div>
  );
}