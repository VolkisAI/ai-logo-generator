"use client";

import { memo } from "react";
import { NodeProps } from "reactflow";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

/**
 * ImageNode component for React Flow.
 * This component displays an image within a card, with a loading state and a download button.
 * It is used to render the generated logos on the canvas.
 * Location: /components/logo-generator/image-node.tsx
 */
const ImageNode = ({ data }: NodeProps<{ imageUrl?: string; isLoading: boolean }>) => {
  const handleDownload = () => {
    if (data.imageUrl) {
      const link = document.createElement("a");
      link.href = data.imageUrl;
      link.download = `logo-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="group relative">
      <CardContent className="p-2">
        {data.isLoading ? (
          <Skeleton className="w-64 h-64 rounded-md" />
        ) : (
          <>
            <img src={data.imageUrl} alt="Generated Logo" className="w-64 h-64 object-cover rounded-md" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-50">
              <Button
                variant="outline"
                size="icon"
                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(ImageNode); 