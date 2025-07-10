"use client";

import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { generateLogoAction } from "@/actions/logo-generator/logo-generator-actions";
import { Toolbar } from "./toolbar";
import ImageNode from "./image-node";

/**
 * LogoCanvas component for the Logo Generator.
 * This component renders a React Flow canvas, providing a space for logo elements.
 * It includes a toolbar for user interactions and manages the logo generation process.
 * Location: /components/logo-generator/logo-canvas.tsx
 */
export function LogoCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const nodeTypes = useMemo(() => ({ imageNode: ImageNode }), []);

  const handleGenerate = useCallback(
    async (brandName: string) => {
      setIsGenerating(true);
      
      const newNodes: Node[] = Array.from({ length: 4 }, (_, index) => ({
        id: `logo-placeholder-${Date.now()}-${index}`,
        type: "imageNode",
        position: { x: (index % 2) * 350, y: Math.floor(index / 2) * 350 },
        data: { isLoading: true },
      }));
      setNodes((prevNodes) => [...prevNodes, ...newNodes]);

      try {
        const { images } = await generateLogoAction(brandName);
        
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            const placeholderIndex = newNodes.findIndex(n => n.id === node.id);
            if (placeholderIndex !== -1) {
              return {
                ...node,
                data: {
                  imageUrl: images[placeholderIndex],
                  isLoading: false,
                },
              };
            }
            return node;
          })
        );
      } catch (error) {
        console.error("Failed to generate logos:", error);
        // Optionally, remove placeholders on error
        setNodes((prevNodes) => prevNodes.filter(n => !newNodes.some(pn => pn.id === n.id)));
      } finally {
        setIsGenerating(false);
      }
    },
    [setNodes]
  );

  return (
    <div className="w-full h-full relative" style={{ height: "calc(100vh - 80px)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <Toolbar onGenerate={handleGenerate} isGenerating={isGenerating} />
    </div>
  );
} 