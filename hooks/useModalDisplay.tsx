import create from 'zustand'

interface ModalDisplayState {
    display: boolean
    setDisplay: (isShown: boolean) => void
}

const useModalDisplay = create<ModalDisplayState>()((set) => ({
    display: false,
    setDisplay: (display) => set((state) => ({ display: display })),
}))

export default useModalDisplay