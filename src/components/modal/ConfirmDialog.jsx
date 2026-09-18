import Modal from "./Modal";
import Button from "../buttons/Button";

// Confirmation prompt for destructive actions (delete user, close account, block card...).
// <ConfirmDialog isOpen={open} title="Delete branch?" description="This can't be undone."
//    onConfirm={handleDelete} onClose={() => setOpen(false)} isLoading={mutation.isPending} />
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  variant = "danger",
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      {description && <p className="text-sm text-slate-500">{description}</p>}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant={variant} onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
