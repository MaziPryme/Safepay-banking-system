// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { Plus, Pencil, Trash2, Building2, Eye } from "lucide-react";
// import PageHeader from "../../../components/pageheader/PageHeader";
// import Card from "../../../components/cards/Card";
// import Table from "../../../components/tables/Tables";
// import Pagination from "../../../components/pagination/Pagination";
// import Button from "../../../components/buttons/Button";
// import IconButton from "../../../components/buttons/IconButton";
// import Badge from "../../../components/badge/Badge";
// import Modal from "../../../components/modal/Modal";
// import ConfirmDialog from "../../../components/modal/ConfirmDialog";
// import Input from "../../../components/forms/Input";
// import EmptyState from "../../../components/empty/EmptyState";
// import { branchService } from "../../../service/branchService";
// import { bankService } from "../../../service/bankService";
// import { formatDate } from "../../../utils/formatters";
// import { validators } from "../../../utils/validators";
// import { PAGE_SIZE } from "../../../utils/constants";

// export default function AdminBranches() {
//     const [page, setPage] = useState(1);
//     const [formModal, setFormModal] = useState(null); // { mode, branch? }
//     const [branchToDelete, setBranchToDelete] = useState(null);
//     const [selectedBranch, setSelectedBranch] = useState(null);
//     const queryClient = useQueryClient();

//     const { data, isLoading } = useQuery({
//         queryKey: ["branches", { page }],
//         queryFn: () => branchService.getAll({ page, limit: PAGE_SIZE }),
//     });
//     const branches = data?.data || data?.branches || [];
//     const totalPages = data?.meta?.totalPages || 1;

//     const { data: bankData } = useQuery({
//         queryKey: ["banks", "all-for-select"],
//         queryFn: () => bankService.getAll({ page: 1, limit: 100 }),
//     });
//     const banks = bankData?.data || bankData?.banks || [];

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm();

//     const invalidate = () => queryClient.invalidateQueries({ queryKey: ["branches"] });

//     const createMutation = useMutation({
//         mutationFn: branchService.create,
//         onSuccess: () => {
//             toast.success("Branch created successfully.");
//             invalidate();
//             closeModal();
//         },
//         onError: (error) => toast.error(error.response?.data?.message || "Could not create branch."),
//     });

//     const updateMutation = useMutation({
//         mutationFn: ({ id, payload }) => branchService.update(id, payload),
//         onSuccess: () => {
//             toast.success("Branch updated successfully.");
//             invalidate();
//             closeModal();
//         },
//         onError: (error) => toast.error(error.response?.data?.message || "Could not update branch."),
//     });

//     const deleteMutation = useMutation({
//         mutationFn: branchService.delete,
//         onSuccess: () => {
//             toast.success("Branch deleted.");
//             invalidate();
//             setBranchToDelete(null);
//         },
//         onError: (error) => toast.error(error.response?.data?.message || "Could not delete branch."),
//     });

//     const openCreateModal = () => {
//         reset({ name: "", bank: "", phone: "", state: "", city: "" });
//         setFormModal({ mode: "create" });
//     };
//     const openEditModal = (branch) => {
//         reset({ ...branch, bank: branch.bank?._id || branch.bank });
//         setFormModal({ mode: "edit", branch });
//     };
//     const closeModal = () => {
//         setFormModal(null);
//         reset();
//     };

//     const onSubmit = (data) => {
//         const { name, ...rest } = data;
//         const payload = { ...rest, branch: name };
//         if (formModal.mode === "create") createMutation.mutate(payload);
//         else updateMutation.mutate({ id: formModal.branch._id, payload });
//     };

//     const columns = [
//         {
//             key: "name",
//             header: "Branch",
//             render: (row) => (
//                 <div className="flex items-center gap-3">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
//                         <Building2 size={16} />
//                     </div>
//                     <span className="font-medium text-ink">{row.name}</span>
//                 </div>
//             ),
//         },
//         {
//             key: "bank",
//             header: "Bank",
//             render: (row) => row.bank?.name || "-",
//         },
//         { key: "phone", header: "Phone" },
//         { key: "state", header: "State" },
//         { key: "city", header: "City" },
//         { key: "status", header: "Status", render: (row) => <Badge status={row.status || "active"} /> },
//         { key: "createdAt", header: "Registered", render: (row) => formatDate(row.createdAt) },
//         {
//             key: "actions",
//             header: "Actions",
//             render: (row) => (
//                 <div className="flex gap-1">
//                     <IconButton icon={Eye} label="View" onClick={(e) => { e.stopPropagation(); setSelectedBranch(row); }} />
//                     <IconButton icon={Pencil} label="Edit" onClick={(e) => { e.stopPropagation(); openEditModal(row); }} />
//                     <IconButton icon={Trash2} label="Delete" onClick={(e) => { e.stopPropagation(); setBranchToDelete(row); }} />
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <PageHeader
//                 title="Branches"
//                 subtitle="Every branch registered on the platform."
//                 action={
//                     <Button variant="primary" onClick={openCreateModal}>
//                         <Plus size={18} /> Add Branch
//                     </Button>
//                 }
//             />

//             <Card noPadding>
//                 {isLoading ? (
//                     <Table columns={columns} data={[]} isLoading emptyMessage="" />
//                 ) : branches.length === 0 ? (
//                     <EmptyState icon={Building2} title="No branches yet" description="Add the first branch to get started." />
//                 ) : (
//                     <Table columns={columns} data={branches} isLoading={isLoading} />
//                 )}
//                 <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
//             </Card>

//             <Modal isOpen={!!formModal} onClose={closeModal} title={formModal?.mode === "create" ? "Add Branch" : "Edit Branch"} size="sm">
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                     <div>
//                         <label className="mb-1 block text-sm font-medium text-ink">Bank</label>
//                         <select
//                             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
//                             {...register("bank", validators.required("Bank"))}
//                         >
//                             <option value="">Select a bank</option>
//                             {banks.map((b) => (
//                                 <option key={b._id} value={b._id}>{b.name}</option>
//                             ))}
//                         </select>
//                         {errors.bank && <p className="mt-1 text-xs text-red-500">{errors.bank.message}</p>}
//                     </div>
//                     <Input label="Branch Name" error={errors.name} {...register("name", validators.required("Branch name"))} />
//                     <Input label="Phone" error={errors.phone} {...register("phone", validators.required("Phone"))} />
//                     <Input label="State" error={errors.state} {...register("state", validators.required("State"))} />
//                     <Input label="City" error={errors.city} {...register("city", validators.required("City"))} />
//                     <Button type="submit" variant="primary" isLoading={createMutation.isPending || updateMutation.isPending} className="w-full">
//                         {formModal?.mode === "create" ? "Create Branch" : "Save Changes"}
//                     </Button>
//                 </form>
//             </Modal>

//             <Modal isOpen={!!selectedBranch} onClose={() => setSelectedBranch(null)} title="Branch Details" size="lg">
//                 {selectedBranch && (
//                     <div className="space-y-5">
//                         <div>
//                             <h3 className="text-xl font-semibold">{selectedBranch.name}</h3>
//                             <Badge status={selectedBranch.status || "active"} />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <p className="text-xs text-gray-500">Bank</p>
//                                 <p>{selectedBranch.bank?.name || "-"}</p>
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500">Phone</p>
//                                 <p>{selectedBranch.phone}</p>
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500">State</p>
//                                 <p>{selectedBranch.state}</p>
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500">City</p>
//                                 <p>{selectedBranch.city}</p>
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500">Created</p>
//                                 <p>{formatDate(selectedBranch.createdAt)}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </Modal>

//             <ConfirmDialog
//                 isOpen={!!branchToDelete}
//                 onClose={() => setBranchToDelete(null)}
//                 onConfirm={() => deleteMutation.mutate(branchToDelete._id)}
//                 title="Delete branch?"
//                 description={`This will permanently remove "${branchToDelete?.name}" and cannot be undone.`}
//                 confirmLabel="Delete"
//                 isLoading={deleteMutation.isPending}
//             />
//         </div>
//     );
// }


import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Landmark, Eye } from "lucide-react";
import PageHeader from "../../../components/pageheader/PageHeader"
import Card from "../../../components/cards/Card";
import Table from "../../../components/tables/Tables";
import Pagination from "../../../components/pagination/Pagination";
import Button from "../../../components/buttons/Button";
import IconButton from "../../../components/buttons/IconButton";
import Badge from "../../../components/badge/Badge";
import Modal from "../../../components/modal/Modal";
import ConfirmDialog from "../../../components/modal/ConfirmDialog";
import Input from "../../../components/forms/Input"
import EmptyState from "../../../components/empty/EmptyState";
import { branchService } from "../../../service/branchService";
import { bankService } from "../../../service/bankService";
import { formatDate } from "../../../utils/formatters";
import { validators } from "../../../utils/validators";
import { PAGE_SIZE } from "../../../utils/constants/index";

export default function AdminBranches() {
  const [page, setPage] = useState(1);
  const [formModal, setFormModal] = useState(null); // { mode: 'create' | 'edit', branch?: object }
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const queryClient = useQueryClient();

  // Fetch Branches
  const { data, isLoading } = useQuery({
    queryKey: ["branches", { page }],
    queryFn: () => branchService.getAll({ page, limit: PAGE_SIZE }),
  });

  const branches = data?.data || data?.branches || [];
  const totalPages = data?.meta?.totalPages || 1;

  // Fetch Banks for select dropdown
  const { data: bankData } = useQuery({
    queryKey: ["banks"],
    queryFn: () => bankService.getAll({ limit: 100 }),
  });
  const banks = bankData?.data || bankData?.banks || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["branches"] });

  // Mutations
  const createMutation = useMutation({
    mutationFn: branchService.create,
    onSuccess: () => {
      toast.success("Branch created successfully.");
      invalidate();
      closeModal();
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Could not create branch."),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => branchService.update(id, payload),
    onSuccess: () => {
      toast.success("Branch updated successfully.");
      invalidate();
      closeModal();
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Could not update branch."),
  });

  const deleteMutation = useMutation({
    mutationFn: branchService.delete,
    onSuccess: () => {
      toast.success("Branch deleted.");
      invalidate();
      setBranchToDelete(null);
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Could not delete branch."),
  });

  // Modal handlers
  const openCreateModal = () => {
    reset({
      name: "",
      bankId: "",
      phone: "",
      state: "",
      city: "",
      status: "active",
    });
    setFormModal({ mode: "create" });
  };

  const openEditModal = (branch) => {
    reset({
      name: branch.name || "",
      bankId: branch.bankId || branch.bank?._id || "",
      phone: branch.phone || "",
      state: branch.state || "",
      city: branch.city || "",
      status: branch.status || "active",
    });
    setFormModal({ mode: "edit", branch });
  };

  const closeModal = () => {
    setFormModal(null);
    reset();
  };

  const onSubmit = (data) => {
    if (formModal.mode === "create") {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate({ id: formModal.branch._id, payload: data });
    }
  };

  // Table Columns
  const columns = [
    {
      key: "name",
      header: "Branch",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            <Landmark size={16} />
          </div>
          <span className="font-medium text-ink">{row.name}</span>
        </div>
      ),
    },
    {
      key: "bank",
      header: "Bank",
      render: (row) => <span>{row.bank?.name || row.bankName || "N/A"}</span>,
    },
    { key: "phone", header: "Phone" },
    { key: "state", header: "State" },
    { key: "city", header: "City" },
    {
      key: "status",
      header: "Status",
      render: (row) => <Badge status={row.status || "active"} />,
    },
    {
      key: "createdAt",
      header: "Opened",
      render: (row) => formatDate(row.createdAt || row.openedAt),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex gap-1">
          <IconButton
            icon={Eye}
            label="View"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBranch(row);
            }}
          />
          <IconButton
            icon={Pencil}
            label="Edit"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(row);
            }}
          />
          <IconButton
            icon={Trash2}
            label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              setBranchToDelete(row);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Branches"
        subtitle="Every branch registered on the platform."
        action={
          <Button variant="primary" onClick={openCreateModal}>
            <Plus size={18} /> Add Branch
          </Button>
        }
      />

      <Card noPadding>
        {isLoading ? (
          <p className="p-4">Loading...</p>
        ) : branches.length === 0 ? (
          <EmptyState
            icon={Landmark}
            title="No branches yet"
            description="Add the first branch to get started."
          />
        ) : (
          <Table columns={columns} data={branches} isLoading={isLoading} />
        )}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Card>

      {/* Create / Edit Form Modal */}
      <Modal
        isOpen={!!formModal}
        onClose={closeModal}
        title={formModal?.mode === "create" ? "Add Branch" : "Edit Branch"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Branch Name"
            error={errors.name}
            {...register("name", validators.required("Branch Name"))}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Bank</label>
            <select
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-primary-500 focus:outline-none"
              {...register("bankId", validators.required("Bank"))}
            >
              <option value="">Select a Bank</option>
              {banks.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
            {errors.bankId && (
              <span className="text-xs text-red-500">
                {errors.bankId.message}
              </span>
            )}
          </div>

          <Input
            label="Phone Number"
            error={errors.phone}
            {...register("phone", validators.required("Phone Number"))}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="State"
              error={errors.state}
              {...register("state", validators.required("State"))}
            />
            <Input
              label="City"
              error={errors.city}
              {...register("city", validators.required("City"))}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={
              createMutation.isPending || updateMutation.isPending
            }
          >
            {formModal?.mode === "create" ? "Create Branch" : "Save Changes"}
          </Button>
        </form>
      </Modal>

      {/* View Branch Details Modal */}
      <Modal
        isOpen={!!selectedBranch}
        onClose={() => setSelectedBranch(null)}
        title="Branch Details"
        size="lg"
      >
        {selectedBranch && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold">{selectedBranch.name}</h3>
              <Badge status={selectedBranch.status || "active"} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Bank</p>
                <p className="text-sm font-medium">
                  {selectedBranch.bank?.name || selectedBranch.bankName || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium">{selectedBranch.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">State</p>
                <p className="text-sm font-medium">{selectedBranch.state}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">City</p>
                <p className="text-sm font-medium">{selectedBranch.city}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Opened Date</p>
                <p className="text-sm font-medium">
                  {formatDate(selectedBranch.createdAt || selectedBranch.openedAt)}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!branchToDelete}
        onClose={() => setBranchToDelete(null)}
        onConfirm={() => deleteMutation.mutate(branchToDelete._id)}
        title="Delete Branch"
        description={`Are you sure you want to delete ${branchToDelete?.name}? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}