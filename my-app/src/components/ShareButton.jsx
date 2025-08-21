"use client";

import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

export default function ShareButton() {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "You can now share this listing with others.",
    });
  };

  return (
    <Button onClick={copyToClipboard} variant="outline" size="icon">
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
