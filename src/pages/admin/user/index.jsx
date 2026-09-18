import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Eye, UserCog } from "lucide-react";
import PageHeader from "../../../components/pageheader/PageHeader";
import Card from "../../../components/cards/Card";
import Table from "../../../components/tables/Tables";
import Pagination from "../../../components/pagination/Pagination";
import Button from "../../../components/buttons/Button";
import IconButton from "../../../components/buttons/IconButton";
import Badge from "../../../components/badge/Badge";
import Select from "../../../components/forms/Select";
import Modal from "../../../components/modal/Modal";
import ConfirmDialog from "../../../components/modal/ConfirmDialog";
import Input from "../../../components/forms/Input";
import EmptyState from "../../../components/empty/EmptyState";
import SearchBar from "../../../components/forms/Search";

import { branchService } from "../../../service/branchService";
import { PAGE_SIZE, ROLES } from "../../../utils/constants";
import { validators } from "../../../utils/validators";
import { formatDate } from "../../../utils/formatters";
import { userService } from "../../../service/userService";

const roleOptions = [
    { value: ROLES.ADMIN, label: "Admin" },
    { value: ROLES.BANK_ADMIN, label: "Bank Admin" },
    { value: ROLES.STAFF, label: "Staff" },
    { value: ROLES.CUSTOMER, label: "Customer" },
    { value: ROLES.CUSTOMER_SERVICE, label: "Customer Service" },
]

export default function AdminUsers() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [formModal, setFormModal] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ["users", { page, search, role: roleFilter }],
        queryFn: () => userService.getAll({
            page, limit: PAGE_SIZE, search: search || undefined, role: roleFilter || undefined
        }),
    });

    const users = data?.data?.data || [];
    const totalPages = data?.data?.meta?.totalPages || 1;

    const { data: branchesRes } = useQuery({
        queryKey: ["branches"],
        queryFn: () => branchService.getAll({ limit: 500, })
    })
    const branches = branchesRes?.data || []

    const {
        register, handleSubmit, reset, formState: { errors },
    } = useForm();

    const invalidate = () => queryClient.invalidateQueries({
        queryKey: ["users"]
    });

    const createMutation = useMutation({
        mutationFn: userService.create,
        onSuccess: () => {
            toast.success("User created successfully.");
            invalidate();
            closeModal();
        },
        onError: (error) =>
            toast.error(
                error.response?.data?.message ||
                "Could not create user."
            ),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }) =>
            userService.update(id, payload),
        onSuccess: () => {
            toast.success("User updated successfully.");
            invalidate();
            closeModal();
        },
        onError: (error) =>
            toast.error(
                error.response?.data?.message ||
                "Could not update user."
            ),
    });

    const deleteMutation = useMutation({
        mutationFn: userService.delete,
        onSuccess: () => {
            toast.success("User deleted.");
            invalidate();
            setUserToDelete(null);
        },
        onError: (error) =>
            toast.error(
                error.response?.data?.message ||
                "Could not delete user."
            ),
    });

    const roleMutation = useMutation({
        mutationFn: ({ id, role }) =>
            userService.changeRole(id, role),
        onSuccess: () => {
            toast.success("Role updated.");
            invalidate();
        },
        onError: (error) =>
            toast.error(
                error.response?.data?.message ||
                "Could not update role."
            ),
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            userService.toggleStatus(id, status),
        onSuccess: () => {
            toast.success("Status updated.");
            invalidate();
        },
        onError: (error) =>
            toast.error(
                error.response?.data?.message ||
                "Could not update status."
            ),
    });

    const openCreateModal = () => {
        reset({
            email: "",
            phone: "",
            password: "",
            role: "",
            branchId: "",
        });

        setFormModal({
            mode: "create",
        });
    };

    const openEditModal = (user) => {
        reset({
            email: user.email || "",
            phone: user.phone || "",
            role: user.role || "",
            status: user.status || "",
            branchId:
                user.branchId?._id ||
                user.branchId ||
                "",
        });

        setFormModal({
            mode: "edit",
            user,
        });
    };

    const closeModal = () => {
        setFormModal(null);
        reset();
    };

    const onSubmit = (formData) => {
        if (formModal.mode === "create") {
            const createPayload = {
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role: formData.role,
                branchId: formData.branchId || undefined,
            };
            createMutation.mutate(createPayload);
            return
        }
        const updatePayload = {
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            branchId: formData.branchId || undefined,
            status: formData.status,
        }

        if (formData.password) {
            updatePayload.password = formData.password;
        }

        updateMutation.mutate({
            id: formModal.user._id,
            payload: updatePayload,
        })
    }

    const columns = [
        {
            key: "email",
            header: "User",

            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                        <UserCog size={18} />
                    </div>

                    <div>
                        <p className="font-medium text-slate-800">
                            {row.email}
                        </p>

                        <p className="text-xs text-slate-500">
                            {row.phone}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            key: "bank",
            header: "Bank",

            render: (row) =>
                row.branchId?.bankId?.name || "-",
        },

        {
            key: "branch",
            header: "Branch",

            render: (row) =>
                row.branchId?.name ||
                row.branch?.name ||
                "-",
        },

        {
            key: "role",
            header: "Role",

            render: (row) => (
                <select
                    value={row.role}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                        roleMutation.mutate({
                            id: row._id,
                            role: e.target.value,
                        })
                    }
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm capitalize"
                >
                    {roleOptions.map((role) => (
                        <option
                            key={role.value}
                            value={role.value}
                        >
                            {role.label}
                        </option>
                    ))}
                </select>
            ),
        },

        {
            key: "status",
            header: "Status",

            render: (row) => (
                <Badge status={row.status} />
            ),
        },

        {
            key: "isEmailVerified",
            header: "Email",

            render: (row) => (
                <Badge
                    status={
                        row.isEmailVerified
                            ? "success"
                            : "warning"
                    }
                >
                    {row.isEmailVerified
                        ? "Verified"
                        : "Pending"}
                </Badge>
            ),
        },

        {
            key: "isPhoneVerified",
            header: "Phone",

            render: (row) => (
                <Badge
                    status={
                        row.isPhoneVerified
                            ? "success"
                            : "warning"
                    }
                >
                    {row.isPhoneVerified
                        ? "Verified"
                        : "Pending"}
                </Badge>
            ),
        },

        {
            key: "actions",
            header: "Actions",

            render: (row) => (
                <div className="flex items-center gap-1">
                    {/* VIEW */}

                    <IconButton
                        icon={Eye}
                        label="View"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(row);
                        }}
                    />

                    {/* EDIT */}

                    <IconButton
                        icon={Pencil}
                        label="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(row);
                        }}
                    />

                    {/* STATUS */}

                    <Button
                        variant="ghost"
                        className="text-xs"
                        onClick={(e) => {
                            e.stopPropagation();

                            statusMutation.mutate({
                                id: row._id,
                                status:
                                    row.status === "active"
                                        ? "suspended"
                                        : "active",
                            });
                        }}
                    >
                        {row.status === "active"
                            ? "Suspend"
                            : "Activate"}
                    </Button>

                    {/* DELETE */}

                    <IconButton
                        icon={Trash2}
                        label="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            setUserToDelete(row);
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Users"
                subtitle="manage all users across the banking platform"
                action={
                    <Button
                        variant="primary"
                        onClick={openCreateModal}>
                        <Plus size={18} />
                        Add User
                    </Button>
                } />

            <Card noPadding>
                <div className="flex flex-col gap-4 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between">
                    <SearchBar
                        value={search}
                        onChange={(value) => { setSearch(value); setPage(1); }}
                        placeholder="Search by email"
                    />
                    <Select
                        className="w-full md:w-60"
                        value={roleFilter}
                        onChange={(e) => {
                            setRoleFilter(e.target.value);
                            setPage(1);
                        }}
                        options={[
                            { value: "", label: "All Roles" }, ...roleOptions,
                        ]}
                    />
                </div>

                {users.length === 0 && !isLoading ? (
                    <EmptyState
                        icon={UserCog}
                        title="No Users Found"
                        description="Create your first user to get started."
                    />
                ) : (
                    <Table
                        columns={columns}
                        data={users}
                        isLoading={isLoading}
                    />
                )}

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </Card>

            <Modal
                isOpen={!!formModal}
                onClose={closeModal}
                title={
                    formModal?.mode === "create"
                        ? "Create User"
                        : "Edit User"
                }
                size="md"
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* EMAIL */}

                    <Input
                        label="Email"
                        type="email"
                        error={errors.email}
                        {...register(
                            "email",
                            validators.email
                        )}
                    />

                    {/* PHONE */}

                    <Input
                        label="Phone"
                        error={errors.phone}
                        {...register(
                            "phone",
                            validators.required("Phone")
                        )}
                    />

                    {/* PASSWORD */}

                    <Input
                        label={
                            formModal?.mode === "create"
                                ? "Password"
                                : "Password (Leave empty to keep current)"
                        }
                        type="password"
                        error={errors.password}
                        {...register(
                            "password",
                            formModal?.mode === "create"
                                ? validators.required("Password")
                                : {}
                        )}
                    />

                    {/* ROLE */}

                    <Select
                        label="Role"
                        options={roleOptions}
                        error={errors.role}
                        {...register(
                            "role",
                            validators.required("Role")
                        )}
                    />

                    {/* BRANCH */}

                    <Select
                        label="Branch"
                        options={[
                            {
                                value: "",
                                label: "Select Branch",
                            },

                            ...branches.map((branch) => ({
                                value: branch._id,
                                label: branch.name,
                            })),
                        ]}
                        error={errors.branchId}
                        {...register("branchId")}
                    />

                    {/* STATUS - EDIT ONLY */}

                    {formModal?.mode === "edit" && (
                        <Select
                            label="Status"
                            options={[
                                {
                                    value: "active",
                                    label: "Active",
                                },
                                {
                                    value: "inactive",
                                    label: "Inactive",
                                },
                                {
                                    value: "suspended",
                                    label: "Suspended",
                                },
                                {
                                    value: "blocked",
                                    label: "Blocked",
                                },
                            ]}
                            error={errors.status}
                            {...register("status")}
                        />
                    )}

                    {/* SUBMIT */}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={
                            createMutation.isPending ||
                            updateMutation.isPending
                        }
                    >
                        {formModal?.mode === "create"
                            ? "Create User"
                            : "Save Changes"}
                    </Button>
                </form>
            </Modal>

            <Modal
                isOpen={!!selectedUser}
                onClose={() => setSelectedUser(null)}
                title="User Details"
                size="md"
            >
                {selectedUser && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* EMAIL */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Email
                                </p>

                                <p className="font-medium">
                                    {selectedUser.email}
                                </p>
                            </div>

                            {/* PHONE */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Phone
                                </p>

                                <p className="font-medium">
                                    {selectedUser.phone}
                                </p>
                            </div>

                            {/* ROLE */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Role
                                </p>

                                <p className="font-medium capitalize">
                                    {selectedUser.role.replaceAll(
                                        "_",
                                        " "
                                    )}
                                </p>
                            </div>

                            {/* STATUS */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Status
                                </p>

                                <Badge
                                    status={selectedUser.status}
                                />
                            </div>

                            {/* BRANCH */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Branch
                                </p>

                                <p className="font-medium">
                                    {selectedUser.branchId?.name ||
                                        "-"}
                                </p>
                            </div>

                            {/* BANK */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Bank
                                </p>

                                <p className="font-medium">
                                    {selectedUser.branchId?.bankId
                                        ?.name || "-"}
                                </p>
                            </div>

                            {/* EMAIL VERIFIED */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Email Verified
                                </p>

                                <Badge
                                    status={
                                        selectedUser.isEmailVerified
                                            ? "success"
                                            : "warning"
                                    }
                                >
                                    {selectedUser.isEmailVerified
                                        ? "Verified"
                                        : "Pending"}
                                </Badge>
                            </div>

                            {/* PHONE VERIFIED */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Phone Verified
                                </p>

                                <Badge
                                    status={
                                        selectedUser.isPhoneVerified
                                            ? "success"
                                            : "warning"
                                    }
                                >
                                    {selectedUser.isPhoneVerified
                                        ? "Verified"
                                        : "Pending"}
                                </Badge>
                            </div>

                            {/* CREATED AT */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Created At
                                </p>

                                <p className="font-medium">
                                    {formatDate(
                                        selectedUser.createdAt
                                    )}
                                </p>
                            </div>

                            {/* UPDATED AT */}

                            <div>
                                <p className="text-sm text-slate-500">
                                    Updated At
                                </p>

                                <p className="font-medium">
                                    {formatDate(
                                        selectedUser.updatedAt
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <ConfirmDialog
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={() =>
                    deleteMutation.mutate(
                        userToDelete._id
                    )
                }
                title="Delete User?"
                description={`Are you sure you want to permanently delete "${userToDelete?.email}"?`}
                confirmLabel="Delete"
                isLoading={
                    deleteMutation.isPending
                }
            />
        </div>
    )
}