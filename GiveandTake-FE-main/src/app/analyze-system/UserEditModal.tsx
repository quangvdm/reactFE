import UserEditForm from "@/components/Forms/UserEditForm";
import { Modal, ModalContent } from "@nextui-org/modal";

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId?: number | null;
}

function UserEditModal({ isOpen, onClose, userId }: Readonly<UserEditModalProps>) {

    return <>
        <Modal backdrop="opaque" size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalContent >
                <UserEditForm userId={userId} />
            </ModalContent>
        </Modal>
    </>;
}

export default UserEditModal;
