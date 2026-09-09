import { useState } from 'react';
import {
  Code2,
  FileCode,
  FolderTree,
  Copy,
  Check,
  Download,
  Terminal,
  Layers,
  Cpu,
  Database,
  ExternalLink
} from 'lucide-react';
import { BACKEND_CODE_FILES, BackendFile } from '../data/backendCodeRepository';

export default function CodeArchitectureViewer() {
  const [selectedFile, setSelectedFile] = useState<BackendFile>(BACKEND_CODE_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'core': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'models': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'nlp': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'analytics': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'ai': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-sky-500/10 text-sky-400 rounded-lg">
                <Code2 className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Visual Studio Code Backend Architecture &amp; Python Services
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Production-ready FastAPI, SQLAlchemy, Google GenAI SDK, and NLP pipelines ready to run directly in your local VS Code workspace or container cluster.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Python 3.12+ • FastAPI • Gemini 3.7 Flash</span>
          </div>
        </div>
      </div>

      {/* VS Code Style Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[640px]">
        {/* Left: VS Code File Explorer (4 cols) */}
        <div className="w-full md:w-72 bg-slate-900/90 border-r border-slate-800 p-3 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center">
                <FolderTree className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> Workspace Files
              </span>
              <span className="text-[10px] font-mono text-emerald-400">{BACKEND_CODE_FILES.length} Files</span>
            </div>

            <div className="space-y-1 overflow-y-auto max-h-[520px] pr-1">
              {BACKEND_CODE_FILES.map(file => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-sky-400' : 'text-slate-400'}`} />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <span className={`text-[9px] px-1 py-0.2 rounded uppercase border ${getCategoryBadge(file.category)}`}>
                      {file.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300 block">FastAPI Local Endpoint:</span>
            <span className="font-mono text-emerald-400">http://127.0.0.1:8000/docs</span>
          </div>
        </div>

        {/* Right: Code Viewer & Actions (Remaining cols) */}
        <div className="flex-1 flex flex-col bg-slate-950">
          {/* File Header Bar */}
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-sky-400" />
              <span className="font-mono font-bold text-slate-200">{selectedFile.path}</span>
              <span className="text-slate-400 hidden sm:inline">— {selectedFile.description}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownloadFile}
                className="flex items-center space-x-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Code Text Editor Area */}
          <div className="flex-1 p-4 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed max-h-[580px] overflow-y-auto selection:bg-sky-900">
            <pre className="whitespace-pre">{selectedFile.content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
