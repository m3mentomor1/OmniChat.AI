// components/ModelSelector.tsx
"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type ModelSelectorProps = {
  selectedModel: string;
  onChange: (model: string) => void;
};

export default function ModelSelector({
  selectedModel,
  onChange,
}: ModelSelectorProps) {
  return (
    <div className="w-full">
      <Label htmlFor="model">Select Model</Label>
      <Select value={selectedModel} onValueChange={onChange}>
        <SelectTrigger id="model" className="mt-1">
          <SelectValue placeholder="Choose a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="microsoft/phi-4-reasoning-plus:free">
            Phi 4 Reasoning Plus (Microsoft)
          </SelectItem>
          <SelectItem value="meta-llama/llama-3.3-8b-instruct:free">
            Llama 3.3 8B Instruct (Meta)
          </SelectItem>
          <SelectItem value="deepseek/deepseek-r1-0528-qwen3-8b:free">
            Deepseek R1 0528 Qwen3 8B (DeepSeek)
          </SelectItem>
          <SelectItem value="google/gemma-3-12b-it:free">
            Gemma 3 12B (Google)
          </SelectItem>
          <SelectItem value="mistralai/mistral-small-3.1-24b-instruct:free">
            Mistral Small 3.1 24B (Mistral)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
