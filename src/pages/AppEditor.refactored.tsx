import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { BlobPreview } from "../components/BlobPreview";
import { ColorPicker } from "../components/ColorPicker";
import { Slider } from "../components/Slider";
import { DownloadMenu } from "../components/DownloadMenu";
import { CodeModal } from "../components/CodeModal";
import { Card } from "../components/Card";
import { ControlGroup } from "../components/ControlGroup";
import { SectionTitle } from "../components/SectionTitle";
import { Divider } from "../components/Divider";
import { Toast } from "../components/Toast";
import { Button } from "../components/Button";
import { ToggleGroup } from "../components/ToggleGroup";
import { AppLayout } from "../components/AppLayout";
import { CircleIcon, BlobShapeIcon, CodeIcon, DiceIcon } from "../components/icons";
import {
  useBlobMaker,
  MIN_EDGES,
  MAX_EDGES,
  MIN_GROWTH,
  MAX_GROWTH,
  MIN_GRADIENT_ANGLE,
  MAX_GRADIENT_ANGLE,
  ANIMATIONS,
  type AnimationType,
} from "../hooks/useBlobMaker";
import { useToast } from "../hooks/useToast";
import { downloadPng, downloadSvg, copyToClipboard, type BlobFill } from "../lib/download";
import { BLOB_TEMPLATES } from "../lib/templates";

interface EditorLocationState {
  templateId?: string;
}

/**
 * Main blob editor page with shape, fill, and animation controls
 * Production-ready, fully typed, clean component structure
 */
export function AppEditor() {
  const {
    color,
    fillType,
    gradientColor,
    gradientAngle,
    edges,
    growth,
    animation,
    path,
    size,
    setColor,
    setFillType,
    setGradientColor,
    setGradientAngle,
    setEdges,
    setGrowth,
    setAnimation,
    applyPreset,
    randomize,
    reshuffle,
  } = useBlobMaker();

  const [codeOpen, setCodeOpen] = useState(false);
  const { message, showToast } = useToast();
  const location = useLocation();
  const hasAppliedTemplate = useRef(false);

  // Apply template preset on mount if provided via router state
  useEffect(() => {
    if (hasAppliedTemplate.current) return;
    const state = (location.state ?? {}) as EditorLocationState;
    if (!state.templateId) return;

    const template = BLOB_TEMPLATES.find((item) => item.id === state.templateId);
    if (!template) return;

    hasAppliedTemplate.current = true;
    applyPreset(template.preset);
    showToast(`Loaded "${template.name}"`);
  }, [location.state, applyPreset, showToast]);

  const fill: BlobFill =
    fillType === "gradient"
      ? { type: "gradient", from: color, to: gradientColor, angle: gradientAngle }
      : { type: "solid", color };

  const handleShare = async () => {
    try {
      await copyToClipboard(window.location.href);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Couldn't copy link");
    }
  };

  const handleDownloadSvg = () => {
    downloadSvg({ path, size, fill });
  };

  const handleDownloadPng = () => {
    downloadPng({ path, size, fill });
  };

  return (
    <AppLayout
      header={<Header onShare={handleShare} />}
      leftPanel={<ShapeControlsPanel {...{ edges, growth, randomize, reshuffle, setEdges, setGrowth }} />}
      centerContent={<BlobPreview path={path} size={size} fill={fill} animation={animation} />}
      rightPanel={
        <FillAnimationExportPanel
          {...{
            fillType,
            color,
            gradientColor,
            gradientAngle,
            animation,
            setFillType,
            setColor,
            setGradientColor,
            setGradientAngle,
            setAnimation,
            onCodeClick: () => setCodeOpen(true),
            onDownloadSvg: handleDownloadSvg,
            onDownloadPng: handleDownloadPng,
          }}
        />
      }
      toast={message && <Toast message={message} />}
      modal={codeOpen && <CodeModal path={path} size={size} fill={fill} onClose={() => setCodeOpen(false)} />}
    />
  );
}

/**
 * Left panel: Shape controls for edges and growth
 */
interface ShapeControlsPanelProps {
  edges: number;
  growth: number;
  randomize: () => void;
  reshuffle: () => void;
  setEdges: (value: number) => void;
  setGrowth: (value: number) => void;
}

function ShapeControlsPanel({
  edges,
  growth,
  randomize,
  reshuffle,
  setEdges,
  setGrowth,
}: ShapeControlsPanelProps) {
  return (
    <Card sticky>
      <div className="flex flex-col gap-5">
        <SectionTitle>Shape</SectionTitle>

        <ControlGroup
          label="Edges"
          icon={<BlobShapeIcon width={18} height={18} />}
          value={edges}
        >
          <Slider
            label="Number of edges"
            min={MIN_EDGES}
            max={MAX_EDGES}
            value={edges}
            onChange={setEdges}
          />
        </ControlGroup>

        <ControlGroup
          label="Growth"
          icon={<CircleIcon width={18} height={18} />}
          value={growth}
        >
          <Slider
            label="Growth / irregularity"
            min={MIN_GROWTH}
            max={MAX_GROWTH}
            value={growth}
            onChange={setGrowth}
          />
        </ControlGroup>

        <Divider className="pt-4" />

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={randomize} className="flex-1">
            <DiceIcon width={16} height={16} />
            Randomize
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={reshuffle}
            title="Reshuffle wobble (keep edges & growth)"
            className="flex-1"
          >
            Reshuffle
          </Button>
        </div>
      </div>
    </Card>
  );
}

/**
 * Right panel: Fill, animation, and export controls
 */
interface FillAnimationExportPanelProps {
  fillType: "solid" | "gradient";
  color: string;
  gradientColor: string;
  gradientAngle: number;
  animation: AnimationType;
  setFillType: (type: "solid" | "gradient") => void;
  setColor: (color: string) => void;
  setGradientColor: (color: string) => void;
  setGradientAngle: (angle: number) => void;
  setAnimation: (type: AnimationType) => void;
  onCodeClick: () => void;
  onDownloadSvg: () => void;
  onDownloadPng: () => void;
}

function FillAnimationExportPanel({
  fillType,
  color,
  gradientColor,
  gradientAngle,
  animation,
  setFillType,
  setColor,
  setGradientColor,
  setGradientAngle,
  setAnimation,
  onCodeClick,
  onDownloadSvg,
  onDownloadPng,
}: FillAnimationExportPanelProps) {
  return (
    <Card sticky>
      <div className="flex flex-col gap-5">
        {/* Fill section */}
        <FillSection
          {...{
            fillType,
            color,
            gradientColor,
            gradientAngle,
            setFillType,
            setColor,
            setGradientColor,
            setGradientAngle,
          }}
        />

        <Divider />

        {/* Animation section */}
        <AnimationSection animation={animation} setAnimation={setAnimation} />

        <Divider />

        {/* Export section */}
        <ExportSection
          onCodeClick={onCodeClick}
          onDownloadSvg={onDownloadSvg}
          onDownloadPng={onDownloadPng}
        />
      </div>
    </Card>
  );
}

/**
 * Fill controls with solid/gradient toggle and color pickers
 */
interface FillSectionProps {
  fillType: "solid" | "gradient";
  color: string;
  gradientColor: string;
  gradientAngle: number;
  setFillType: (type: "solid" | "gradient") => void;
  setColor: (color: string) => void;
  setGradientColor: (color: string) => void;
  setGradientAngle: (angle: number) => void;
}

function FillSection({
  fillType,
  color,
  gradientColor,
  gradientAngle,
  setFillType,
  setColor,
  setGradientColor,
  setGradientAngle,
}: FillSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <SectionTitle>Fill</SectionTitle>
        <ToggleGroup
          options={[
            { id: "solid", label: "Solid" },
            { id: "gradient", label: "Gradient" },
          ]}
          value={fillType}
          onChange={setFillType}
          variant="pill"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <ColorPicker color={color} onChange={setColor} />
        <div
          className={`grid transition-all duration-300 ease-out ${
            fillType === "gradient"
              ? "grid-cols-[1fr] opacity-100"
              : "grid-cols-[0fr] opacity-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          <div className="min-w-0">
            <ColorPicker color={gradientColor} onChange={setGradientColor} />
          </div>
        </div>
      </div>

      {fillType === "gradient" && (
        <div className="animate-fade-in">
          <ControlGroup
            label="Angle"
            value={`${gradientAngle}°`}
          >
            <Slider
              label="Gradient angle"
              min={MIN_GRADIENT_ANGLE}
              max={MAX_GRADIENT_ANGLE}
              value={gradientAngle}
              onChange={setGradientAngle}
            />
          </ControlGroup>
        </div>
      )}
    </div>
  );
}

/**
 * Animation selection section
 */
interface AnimationSectionProps {
  animation: AnimationType;
  setAnimation: (type: AnimationType) => void;
}

function AnimationSection({ animation, setAnimation }: AnimationSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>Animation</SectionTitle>
      <ToggleGroup
        options={ANIMATIONS.map((option) => ({
          id: option.id,
          label: option.label,
        }))}
        value={animation}
        onChange={(value) => setAnimation(value as AnimationType)}
      />
    </div>
  );
}

/**
 * Export controls section
 */
interface ExportSectionProps {
  onCodeClick: () => void;
  onDownloadSvg: () => void;
  onDownloadPng: () => void;
}

function ExportSection({ onCodeClick, onDownloadSvg, onDownloadPng }: ExportSectionProps) {
  return (
    <div className="flex items-center justify-between gap-3 pt-4">
      <SectionTitle>Export</SectionTitle>
      <div className="flex items-center gap-2">
        <Button
          variant="icon"
          size="sm"
          onClick={onCodeClick}
          aria-label="View code"
          title="Copy code"
        >
          <CodeIcon />
        </Button>
        <DownloadMenu onDownloadSvg={onDownloadSvg} onDownloadPng={onDownloadPng} />
      </div>
    </div>
  );
}
