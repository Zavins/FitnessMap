import { LayoutRectangle } from 'react-native'
import create from 'zustand'
import Layout from '../constants/Layout'

let { window } = Layout

interface WindowLayoutState {
    layout: LayoutRectangle | typeof window
    setLayout: (layout: LayoutRectangle) => void
}

const useWindowLayout = create<WindowLayoutState>()((set) => ({
    layout: window,
    setLayout: (layout) => set((state) => ({ layout: layout })),
}))

export default useWindowLayout