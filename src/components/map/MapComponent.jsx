import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus, Locate, Maximize, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const defaultStyles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

function getDocumentTheme() {
  if (typeof document === "undefined") return null;
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.classList.contains("light")) return "light";
  return null;
}

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useResolvedTheme(themeProp) {
  const [detectedTheme, setDetectedTheme] = useState(() => getDocumentTheme() ?? getSystemTheme());

  useEffect(() => {
    if (themeProp) return;
    const observer = new MutationObserver(() => {
      const docTheme = getDocumentTheme();
      setDetectedTheme(docTheme ?? getSystemTheme());
    });
    if (document?.documentElement) {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    }
    return () => observer.disconnect();
  }, [themeProp]);

  return themeProp ?? detectedTheme;
}

const MapContext = createContext(null);

const MapComponent = forwardRef(
  (
    {
      theme,
      center = [0, 0],
      zoom = 10,
      pitch = 0,
      bearing = 0,
      projection = "mercator",
      minZoom = 0,
      maxZoom = 22,
      maxPitch = 85,
      styles,
      className,
      children,
    },
    ref
  ) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const resolvedTheme = useResolvedTheme(theme);
    const mapStyle =
      (styles && (resolvedTheme ? styles[resolvedTheme] : styles.light)) ||
      defaultStyles[resolvedTheme || "light"] ||
      defaultStyles.light;

    useEffect(() => {
      if (!mapRef.current && mapContainerRef.current) {
        mapRef.current = new MapLibreGL.Map({
          container: mapContainerRef.current,
          style: mapStyle,
          center: center,
          zoom: zoom,
          pitch: pitch,
          bearing: bearing,
          minZoom: minZoom,
          maxZoom: maxZoom,
          maxPitch: maxPitch,
          projection: projection,
        });

        mapRef.current.on("load", () => {
          setIsLoaded(true);
        });
      }
      return () => {
        mapRef.current?.remove();
        mapRef.current = null;
      };
      // Only run on mount/unmount and theme/style changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapStyle]);

    // Update pitch/bearing/center/zoom on changes
    useEffect(() => {
      if (mapRef.current && isLoaded) {
        mapRef.current.easeTo({ center, zoom, pitch, bearing });
      }
    }, [center, zoom, pitch, bearing, isLoaded]);

    // Forward ref to allow imperative map access
    useImperativeHandle(ref, () => mapRef.current, []);

    return (
      <MapContext.Provider value={mapRef}>
        <div className={cn("relative w-full h-full", className)}>
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full rounded-lg border" />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          )}
          {isLoaded && children}
        </div>
      </MapContext.Provider>
    );
  }
);

MapComponent.displayName = "MapComponent";

export default MapComponent;

export function useMap() {
  return useContext(MapContext);
}

