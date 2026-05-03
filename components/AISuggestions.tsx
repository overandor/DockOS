"use client";

import { useState } from "react";
import {
  generateListingTitle,
  generateListingDescription,
  generateAmenities,
  generateRules
} from "@/lib/hf-llm";

interface AISuggestionsProps {
  type: "title" | "description" | "amenities" | "rules";
  onSuggestion: (suggestion: string | string[]) => void;
  context?: {
    description?: string;
    amenities?: string[];
    location?: string;
    theme?: string;
    spaceType?: string;
    hostStyle?: string;
  };
}

export default function AISuggestions({
  type,
  onSuggestion,
  context
}: AISuggestionsProps) {
  const [loading, setLoading] = useState(false);

  const handleGenerateTitle = async () => {
    setLoading(true);
    try {
      const title = await generateListingTitle(
        context?.description || "A comfortable private space",
        context?.amenities || ["Wi-Fi", "Quiet environment"]
      );
      onSuggestion(title);
    } catch (error) {
      console.error("[v0] Error generating title:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
    setLoading(true);
    try {
      const description = await generateListingDescription(
        context?.description || "Private Dock",
        context?.amenities || [],
        context?.location || "Downtown"
      );
      onSuggestion(description);
    } catch (error) {
      console.error("[v0] Error generating description:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAmenities = async () => {
    setLoading(true);
    try {
      const amenities = await generateAmenities(
        context?.theme || "Modern",
        context?.spaceType || "Private"
      );
      onSuggestion(amenities);
    } catch (error) {
      console.error("[v0] Error generating amenities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRules = async () => {
    setLoading(true);
    try {
      const rules = await generateRules(
        context?.amenities || [],
        context?.hostStyle || "Friendly"
      );
      onSuggestion(rules);
    } catch (error) {
      console.error("[v0] Error generating rules:", error);
    } finally {
      setLoading(false);
    }
  };

  const getHandler = () => {
    switch (type) {
      case "title":
        return handleGenerateTitle;
      case "description":
        return handleGenerateDescription;
      case "amenities":
        return handleGenerateAmenities;
      case "rules":
        return handleGenerateRules;
    }
  };

  const getLabel = () => {
    switch (type) {
      case "title":
        return "Generate Title";
      case "description":
        return "Generate Description";
      case "amenities":
        return "Suggest Amenities";
      case "rules":
        return "Generate Rules";
    }
  };

  return (
    <button
      onClick={getHandler()}
      disabled={loading}
      className="neo-button inline-flex items-center gap-2 rounded-lg px-4 py-2 text-primary font-medium text-sm hover:text-primaryLight disabled:opacity-50 transition"
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Generating...</span>
        </>
      ) : (
        <>
          <span>✨</span>
          <span>{getLabel()}</span>
        </>
      )}
    </button>
  );
}
