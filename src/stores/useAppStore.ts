import { create } from "zustand";

interface AppState {
  mousePosition: { x: number; y: number };
  scrollY: number;
  scrollProgress: number;
  isLoaded: boolean;
  currentSection: string;
  setMousePosition: (pos: { x: number; y: number }) => void;
  setScrollY: (y: number) => void;
  setScrollProgress: (progress: number) => void;
  setIsLoaded: (loaded: boolean) => void;
  setCurrentSection: (section: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mousePosition: { x: 0, y: 0 },
  scrollY: 0,
  scrollProgress: 0,
  isLoaded: false,
  currentSection: "hero",
  setMousePosition: (pos) => set({ mousePosition: pos }),
  setScrollY: (y) => set({ scrollY: y }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setCurrentSection: (section) => set({ currentSection: section }),
}));
