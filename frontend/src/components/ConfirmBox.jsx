import React from 'react'


function ConfirmBox({ title, message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4  backdrop-blur-xs">

            <div className="w-full max-w-sm rounded-lg bg-surface p-6 shadow-card">

                <h2 className="font-headline text-headline-md mb-2">
                    {title}
                    {/* Delete All */}
                </h2>

                <p className="text-body-md text-text-muted mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-button border border-border px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-button bg-red-500 px-4 py-2 text-white"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ConfirmBox;
