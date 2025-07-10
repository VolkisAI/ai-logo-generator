"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

/**
 * Toolbar component for the Logo Generator.
 * This component provides an input field for the brand name and a button to initiate logo generation.
 * It is positioned at the top of the canvas.
 * Location: /components/logo-generator/toolbar.tsx
 */
export function Toolbar({
  onGenerate,
  isGenerating,
}: {
  onGenerate: (brandName: string) => void;
  isGenerating: boolean;
}) {
  const [brandName, setBrandName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (brandName.trim()) {
      onGenerate(brandName.trim());
    }
  };

  return (
    <motion.div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Card className="p-0">
        <CardContent className="p-2">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              name="brandName"
              type="text"
              placeholder="Enter your brand name..."
              className="w-80"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              disabled={isGenerating}
            />
            <Button type="submit" disabled={isGenerating}>
              {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
} 