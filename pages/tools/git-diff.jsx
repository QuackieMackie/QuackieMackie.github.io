import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCode,
    faClipboard,
    faUpload,
    faChevronDown,
    faChevronRight,
    faFolder,
    faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';

const Layout = dynamic(() => import('../../components/Layout'), {
    ssr: false,
});

function buildFileTree(files) {
    const root = { name: 'root', type: 'folder', children: {} };
    files.forEach((file) => {
        const parts = file.name.split('/');
        let current = root;
        parts.forEach((part, index) => {
            if (index === parts.length - 1) {
                current.children[part] = { name: part, type: 'file', fileData: file };
            } else {
                if (!current.children[part]) {
                    current.children[part] = { name: part, type: 'folder', children: {} };
                }
                current = current.children[part];
            }
        });
    });
    return root;
}

function FileTreeItem({ item, path, onFileClick, selectedFile, expandedFolders, toggleFolder }) {
    if (item.type === 'file') {
        const isSelected = selectedFile && selectedFile.name === item.fileData.name;
        return (
            <div
                className={`tree-item file ${isSelected ? 'selected' : ''}`}
                onClick={() => onFileClick(item.fileData)}
            >
                <FontAwesomeIcon icon={faFileCode} className="tree-icon" />
                <span>{item.name}</span>
            </div>
        );
    }

    const isExpanded = expandedFolders[path];
    return (
        <div className="tree-folder-container">
            <div className="tree-item folder" onClick={() => toggleFolder(path)}>
                <FontAwesomeIcon
                    icon={isExpanded ? faChevronDown : faChevronRight}
                    className="collapse-icon"
                />
                <FontAwesomeIcon
                    icon={isExpanded ? faFolderOpen : faFolder}
                    className="tree-icon folder-icon"
                />
                <span>{item.name}</span>
            </div>
            {isExpanded && (
                <div className="tree-children">
                    {Object.values(item.children)
                        .sort((a, b) => {
                            if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
                            return a.name.localeCompare(b.name);
                        })
                        .map((child) => (
                            <FileTreeItem
                                key={child.name}
                                item={child}
                                path={`${path}/${child.name}`}
                                onFileClick={onFileClick}
                                selectedFile={selectedFile}
                                expandedFolders={expandedFolders}
                                toggleFolder={toggleFolder}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}

function parseDiff(diffText) {
    if (!diffText) return [];
    const files = [];
    const lines = diffText.split('\n');
    let currentFile = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('diff --git')) {
            const parts = line.split(' ');
            const fileName = parts[parts.length - 1].replace(/^b\//, '');
            currentFile = {
                name: fileName,
                hunks: [],
            };
            files.push(currentFile);
        } else if (line.startsWith('@@')) {
            const hunk = {
                header: line,
                lines: [],
            };
            if (currentFile) {
                currentFile.hunks.push(hunk);
            }
        } else if (currentFile && currentFile.hunks.length > 0) {
            if (
                line.startsWith('---') ||
                line.startsWith('+++') ||
                line.startsWith('index') ||
                line.startsWith('new file mode') ||
                line.startsWith('deleted file mode') ||
                line.startsWith('similarity index') ||
                line.startsWith('rename from') ||
                line.startsWith('rename to')
            ) {
                continue;
            }
            currentFile.hunks[currentFile.hunks.length - 1].lines.push(line);
        }
    }

    return files;
}

function GitDiffTool() {
    const [diffInput, setDiffInput] = useState('');
    const [parsedFiles, setParsedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [expandedFolders, setExpandedFolders] = useState({ root: true });

    const handleViewDiff = () => {
        const files = parseDiff(diffInput);
        setParsedFiles(files);
        setSelectedFile(files.length > 0 ? files[0] : null);
        setExpandedFolders({ root: true });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            setDiffInput(content);
            const files = parseDiff(content);
            setParsedFiles(files);
            setSelectedFile(files.length > 0 ? files[0] : null);
            setExpandedFolders({ root: true });
        };
        reader.readAsText(file);
    };

    const toggleFolder = (path) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    const fileTree = buildFileTree(parsedFiles);

    return (
        <main className="main">
            <section className="section git-diff-container">
                <h1>Git Diff Viewer</h1>
                <p>Upload a diff file or paste your git diff content below to visualise changes.</p>

                <div className="diff-input-section">
                    <textarea
                        className="diff-textarea"
                        placeholder="Or paste git diff here..."
                        value={diffInput}
                        onChange={(e) => setDiffInput(e.target.value)}
                    />
                    <div className="diff-actions">
                        <div className="upload-section">
                            <label htmlFor="diff-upload" className="btn-secondary">
                                <FontAwesomeIcon icon={faUpload} /> Upload Diff File
                            </label>
                            <input
                                id="diff-upload"
                                type="file"
                                accept=".diff,.patch,text/plain"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <button className="btn-primary" onClick={handleViewDiff}>
                            <FontAwesomeIcon icon={faClipboard} /> View Diff
                        </button>
                    </div>
                </div>

                {parsedFiles.length > 0 && (
                    <div className="diff-workspace">
                        <div className="diff-explorer">
                            <div className="explorer-header">Files</div>
                            <div className="explorer-tree">
                                {Object.values(fileTree.children)
                                    .sort((a, b) => {
                                        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
                                        return a.name.localeCompare(b.name);
                                    })
                                    .map((child) => (
                                        <FileTreeItem
                                            key={child.name}
                                            item={child}
                                            path={`root/${child.name}`}
                                            onFileClick={setSelectedFile}
                                            selectedFile={selectedFile}
                                            expandedFolders={expandedFolders}
                                            toggleFolder={toggleFolder}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="diff-content">
                            {selectedFile ? (
                                <div className="diff-file">
                                    <div className="diff-file-header">
                                        <div className="header-info">
                                            <FontAwesomeIcon icon={faFileCode} />
                                            <span className="file-name">{selectedFile.name}</span>
                                        </div>
                                    </div>
                                    <div className="diff-file-content">
                                        {selectedFile.hunks.map((hunk, hIdx) => (
                                            <div key={hIdx} className="diff-hunk">
                                                <div className="diff-hunk-header">
                                                    {hunk.header}
                                                </div>
                                                {hunk.lines.map((line, lIdx) => {
                                                    let className = 'diff-line';
                                                    if (line.startsWith('+')) className += ' added';
                                                    else if (line.startsWith('-'))
                                                        className += ' removed';
                                                    else if (line.startsWith('\\'))
                                                        className += ' note';

                                                    return (
                                                        <div key={lIdx} className={className}>
                                                            {line}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="diff-empty-selection">
                                    Select a file to view changes
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {parsedFiles.length === 0 && diffInput && (
                    <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: '20px' }}>
                        No files detected. Make sure you are pasting a valid git diff.
                    </p>
                )}
            </section>
        </main>
    );
}

export default function GitDiffPage() {
    return (
        <Layout>
            <GitDiffTool />
        </Layout>
    );
}
