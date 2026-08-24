import type {
  BlobStyle,
  BlobShape,
  AnimationSettings,
  EffectSettings,
  DisplaySettings,
  ColorSettings,
} from "../hooks/useBlob";
import CSSBlobPreview from "./CSSBlobPreview";
import ThreeBlobPreview from "./ThreeBlobPreview";

interface Props {
  blobStyle: BlobStyle;
  shape: BlobShape;
  displaySettings: DisplaySettings;
  animationSettings: AnimationSettings;
  effectSettings: EffectSettings;
  colorSettings: ColorSettings;
  is3D: boolean;
}

export default function BlobPreview({
  blobStyle,
  shape,
  displaySettings,
  animationSettings,
  effectSettings,
  colorSettings,
  is3D,
}: Props) {
  if (is3D) {
    return (
      <ThreeBlobPreview
        shape={shape}
        displaySettings={displaySettings}
        animationSettings={animationSettings}
        effectSettings={effectSettings}
        colorSettings={colorSettings}
      />
    );
  }

  return (
    <CSSBlobPreview
      blobStyle={blobStyle}
      shape={shape}
      morphIntensity={displaySettings.morphIntensity}
      animationSettings={animationSettings}
      effectSettings={effectSettings}
    />
  );
}
