import { Channel, ChannelType } from "@prisma/client";
import { Server } from "http";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" |
"members"|"createChannel" |"leaveServer" | "deleteServer"|"deleteChannel"|"editChannel"|"editMember"|"editRole"|"editProfile"|"editServerIcon"|"editServerBanner"|"editServerName"|"editChannelName"|"editChannelType"|"deleteMember"|"deleteRole"|"deleteChannel"|"deleteServerIcon"|"deleteServerBanner"|"messageFile"|"deleteMessage";


interface ModalData {
    server?: Server;
    channel?:Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string,any>;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({

    type: null,
    data: {},

    isOpen: false,

    onOpen: (type, data = {}) => set({ isOpen: true, type,data }),

    onClose: () => set({ type: null, isOpen: false })

}));