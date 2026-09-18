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
import Input from "../../../components/forms/Input";
import EmptyState from "../../../components/empty/EmptyState";
import { bankService } from "../../../service/bankService";
import { formatDate } from "../../../utils/formatters";
import { validators } from "../../../utils/validators";
import { PAGE_SIZE } from "../../../utils/constants";

export default function AdminBanks() {
    const [page, setPage] = useState(1);
    const [formModal, setFormModal] = useState(null); // { mode, bank? }
    const [bankToDelete, setBankToDelete] = useState(null);
    const queryClient = useQueryClient();
    const [selectedBank, setSelectedBank] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ["banks", { page }],
        queryFn: () => bankService.getAll({ page, limit: PAGE_SIZE }),
    });
    const banks = data?.data || data?.banks || [];
    const totalPages = data?.meta?.totalPages || 1;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["banks"] });

    const createMutation = useMutation({
        mutationFn: bankService.create,
        onSuccess: () => {
            toast.success("Bank created successfully.");
            invalidate();
            closeModal();
        },
        onError: (error) => toast.error(error.response?.data?.message || "Could not create bank."),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }) => bankService.update(id, payload),
        onSuccess: () => {
            toast.success("Bank updated successfully.");
            invalidate();
            closeModal();
        },
        onError: (error) => toast.error(error.response?.data?.message || "Could not update bank."),
    });

    const deleteMutation = useMutation({
        mutationFn: bankService.delete,
        onSuccess: () => {
            toast.success("Bank deleted.");
            invalidate();
            setBankToDelete(null);
        },
        onError: (error) => toast.error(error.response?.data?.message || "Could not delete bank."),
    });

    const openCreateModal = () => {
        reset({ name: "", country: "", address: "" });
        setFormModal({ mode: "create" });
    };
    const openEditModal = (bank) => {
        reset(bank);
        setFormModal({ mode: "edit", bank });
    };
    const closeModal = () => {
        setFormModal(null);
        reset();
    };

    const onSubmit = (data) => {
        if (formModal.mode === "create") createMutation.mutate(data);
        else updateMutation.mutate({ id: formModal.bank._id, payload: data });
    };

    const columns = [
        {
            key: "name",
            header: "Bank",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center
                     rounded-lg bg-primary-50 text-primary-600">
                        <Landmark size={16} />
                    </div>
                    <span className="font-medium text-ink">{row.name}</span>
                </div>
            ),
        },
        {
            key: "description",
            header: "Description",
            render: (row) => (
                <span className="line-clamp-2 max-w-xs">
                    {row.description}
                </span>
            ),
        },
        { key: "country", header: "Country" },
        { key: "address", header: "Official Address" },
        { key: "status", header: "Status", render: (row) => <Badge status={row.status || "active"} /> },
        { key: "createdAt", header: "Registered", render: (row) => formatDate(row.createdAt) },
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
                            setSelectedBank(row);
                        }}
                    />
                    <IconButton icon={Pencil} label="Edit" onClick={(e) => { e.stopPropagation(); openEditModal(row); }} />
                    <IconButton icon={Trash2} label="Delete" onClick={(e) => { e.stopPropagation(); setBankToDelete(row); }} />
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Banks"
                subtitle="Every bank registered on the platform."
                action={
                    <Button variant="primary" onClick={openCreateModal}>
                        <Plus size={18} /> Add Bank
                    </Button>
                }
            />

            <Card noPadding>
                {isLoading ? (
                    <Table columns={columns} data={[]} isLoading emptyMessage="" />
                ) : banks.length === 0 ? (
                    <EmptyState icon={Landmark} title="No banks yet" description="Add the first bank to get started." />
                ) : (
                    <Table columns={columns} data={banks} isLoading={isLoading} />
                )}
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </Card>

            <Modal isOpen={!!formModal} onClose={closeModal} title={formModal?.mode === "create" ? "Add Bank" : "Edit Bank"} size="sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input label="Bank Name" error={errors.name} {...register("name", validators.required("Bank name"))} />
                    <Input
                        label="Description"
                        as="textarea"
                        rows={4}
                        error={errors.description}
                        {...register(
                            "description",
                            validators.required("Description")
                        )}
                    />
                    <Input label="Country" error={errors.country} {...register("country", validators.required("Country"))} />
                    <Input label="Officail Address" type="text" error={errors.address} {...register("address", validators.required("Officail Address"))} />
                    <Button type="submit" variant="primary" isLoading={createMutation.isPending || updateMutation.isPending} className="w-full">
                        {formModal?.mode === "create" ? "Create Bank" : "Save Changes"}
                    </Button>
                </form>
            </Modal>
            <Modal
                isOpen={!!selectedBank}
                onClose={() => setSelectedBank(null)}
                title="Bank Details"
                size="lg"
            >
                {selectedBank && (
                    <div className="space-y-5">

                        <div>
                            <h3 className="text-xl font-semibold">
                                {selectedBank.name}
                            </h3>

                            <Badge
                                status={
                                    selectedBank.status || "active"
                                }
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <p className="text-xs text-gray-500">
                                    Country
                                </p>

                                <p>{selectedBank.country}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Created
                                </p>

                                <p>
                                    {formatDate(
                                        selectedBank.createdAt
                                    )}
                                </p>
                            </div>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">
                                Address
                            </p>

                            <p>
                                {selectedBank.address}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">
                                Description
                            </p>

                            <p>
                                {selectedBank.description}
                            </p>

                        </div>

                    </div>
                )}
            </Modal>

            <ConfirmDialog
                isOpen={!!bankToDelete}
                onClose={() => setBankToDelete(null)}
                onConfirm={() => deleteMutation.mutate(bankToDelete._id)}
                title="Delete bank?"
                description={`This will permanently remove "${bankToDelete?.name}" and cannot be undone.`}
                confirmLabel="Delete"
                isLoading={deleteMutation.isPending}
            />
        </div>
    );
}