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
            microsoft/phi-4-reasoning-plus:free
          </SelectItem>
          <SelectItem value="meta-llama/llama-3.3-8b-instruct:free">
            meta-llama/llama-3.3-8b-instruct:free
          </SelectItem>
          <SelectItem value="deepseek/deepseek-r1-0528-qwen3-8b:free">
            deepseek/deepseek-r1-0528-qwen3-8b:free
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
