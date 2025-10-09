"use client";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NutriScoreBadgeProps {
  grade: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

export function NutriScoreBadge({
  grade,
  className,
  size = "md",
  showTooltip = true,
}: NutriScoreBadgeProps) {
  const [showInfo, setShowInfo] = useState(false);

  const getGradeInfo = (grade: string) => {
    const grades = {
      a: {
        label: "A",
        color: "bg-gradient-to-br from-green-400 to-green-600",
        textColor: "text-white",
        description: "Muito bom",
        explanation: "Produto com excelente qualidade nutricional",
        pulse: false,
      },
      b: {
        label: "B",
        color: "bg-gradient-to-br from-green-300 to-green-500",
        textColor: "text-white",
        description: "Bom",
        explanation: "Produto com boa qualidade nutricional",
        pulse: false,
      },
      c: {
        label: "C",
        color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
        textColor: "text-white",
        description: "Regular",
        explanation: "Produto com qualidade nutricional regular",
        pulse: false,
      },
      d: {
        label: "D",
        color: "bg-gradient-to-br from-orange-400 to-orange-600",
        textColor: "text-white",
        description: "Ruim",
        explanation: "Produto com qualidade nutricional ruim",
        pulse: true,
      },
      e: {
        label: "E",
        color: "bg-gradient-to-br from-red-400 to-red-600",
        textColor: "text-white",
        description: "Muito ruim",
        explanation: "Produto com qualidade nutricional muito ruim",
        pulse: true,
      },
    };

    return grades[grade.toLowerCase() as keyof typeof grades] || null;
  };

  const gradeInfo = getGradeInfo(grade);
  if (!gradeInfo) return null;

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-16 h-16 text-xl",
    lg: "w-20 h-20 text-2xl",
  };

  return (
    <div className="relative group">
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105",
          gradeInfo.color,
          sizeClasses[size],
          gradeInfo.pulse && "animate-pulse",
          className
        )}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <span className={cn("font-bold", gradeInfo.textColor)}>
          {gradeInfo.label}
        </span>

        {/* Efeito de brilho para notas baixas */}
        {gradeInfo.pulse && (
          <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
        )}
      </div>

      {/* Tooltip informativo */}
      {showTooltip && showInfo && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">
                Nutri-Score {gradeInfo.label}
              </span>
              {gradeInfo.pulse && (
                <AlertTriangle className="w-3 h-3 text-yellow-400" />
              )}
            </div>
            <p className="font-medium">{gradeInfo.description}</p>
            <p className="text-gray-300 mt-1">{gradeInfo.explanation}</p>

            {/* Seta do tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      )}

      {/* Badge de alerta para notas baixas */}
      {gradeInfo.pulse && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-2.5 h-2.5 text-white" />
        </div>
      )}
    </div>
  );
}

interface NovaBadgeProps {
  group: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

export function NovaBadge({
  group,
  className,
  size = "md",
  showTooltip = true,
}: NovaBadgeProps) {
  const [showInfo, setShowInfo] = useState(false);

  const getGroupInfo = (group: number) => {
    const groups = {
      1: {
        label: "1",
        color: "bg-gradient-to-br from-green-400 to-green-600",
        textColor: "text-white",
        description: "Não processado",
        explanation: "Alimentos não processados ou minimamente processados",
        pulse: false,
      },
      2: {
        label: "2",
        color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
        textColor: "text-white",
        description: "Ingredientes",
        explanation: "Ingredientes culinários processados",
        pulse: false,
      },
      3: {
        label: "3",
        color: "bg-gradient-to-br from-orange-400 to-orange-600",
        textColor: "text-white",
        description: "Processado",
        explanation: "Alimentos processados",
        pulse: true,
      },
      4: {
        label: "4",
        color: "bg-gradient-to-br from-red-400 to-red-600",
        textColor: "text-white",
        description: "Ultraprocessado",
        explanation: "Alimentos ultraprocessados",
        pulse: true,
      },
    };

    return groups[group as keyof typeof groups] || null;
  };

  const groupInfo = getGroupInfo(group);
  if (!groupInfo) return null;

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-16 h-16 text-xl",
    lg: "w-20 h-20 text-2xl",
  };

  return (
    <div className="relative group">
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105",
          groupInfo.color,
          sizeClasses[size],
          groupInfo.pulse && "animate-pulse",
          className
        )}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <span className={cn("font-bold", groupInfo.textColor)}>
          {groupInfo.label}
        </span>

        {/* Efeito de brilho para grupos altos */}
        {groupInfo.pulse && (
          <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
        )}
      </div>

      {/* Tooltip informativo */}
      {showTooltip && showInfo && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">NOVA {groupInfo.label}</span>
              {groupInfo.pulse && (
                <AlertTriangle className="w-3 h-3 text-yellow-400" />
              )}
            </div>
            <p className="font-medium">{groupInfo.description}</p>
            <p className="text-gray-300 mt-1">{groupInfo.explanation}</p>

            {/* Seta do tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      )}

      {/* Badge de alerta para grupos altos */}
      {groupInfo.pulse && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-2.5 h-2.5 text-white" />
        </div>
      )}
    </div>
  );
}
