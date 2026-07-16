"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  AlertCircle,
  AlertTriangle,
  Beaker,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { searchByBarcode, Product, formatNutritionData } from "@/lib/openFoodFactsApi";
import { ProductSkeleton } from "@/app/components/ProductSkeleton";

/* ── Nutri-Score letter circle ─────────────────────────────────────────── */
const NUTRI_BG: Record<string, string> = {
  a: "#038141",
  b: "#85bb2f",
  c: "#fecb02",
  d: "#ee8100",
  e: "#e63e11",
};
const NUTRI_INK: Record<string, string> = {
  a: "#fff",
  b: "#fff",
  c: "#3a2a00",
  d: "#fff",
  e: "#fff",
};
const GRADE_DESC: Record<string, string> = {
  a: "Excelente qualidade nutricional",
  b: "Boa qualidade nutricional",
  c: "Qualidade regular",
  d: "Qualidade ruim",
  e: "Qualidade muito ruim",
};
const NOVA_DESC: Record<number, string> = {
  1: "Alimento in natura ou minimamente processado.",
  2: "Ingrediente culinário processado.",
  3: "Alimento processado com adição de sal, açúcar ou óleo.",
  4: "Ultraprocessado — formulação industrial com aditivos.",
};
const NOVA_BG: Record<number, string> = {
  1: "#038141",
  2: "#fecb02",
  3: "#ee8100",
  4: "#e63e11",
};
const NOVA_INK: Record<number, string> = {
  1: "#fff",
  2: "#3a2a00",
  3: "#fff",
  4: "#fff",
};

function NutriLetter({ grade, size = 92 }: { grade: string; size?: number }) {
  const g = grade?.toLowerCase();
  if (!NUTRI_BG[g]) return null;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: Math.round(size * 0.63),
        color: NUTRI_INK[g],
        background: NUTRI_BG[g],
        fontWeight: 400,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        flexShrink: 0,
        boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.15), 0 8px 24px -8px rgba(0,0,0,0.2)",
      }}
    >
      {g.toUpperCase()}
    </div>
  );
}

/* ── Nutri-Scale row (A–E with active highlight) ────────────────────────── */
function NutriScale({ active, size = "sm" }: { active: string; size?: "sm" | "md" }) {
  const px = size === "sm" ? 18 : 26;
  const fs = size === "sm" ? 9 : 12;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "var(--ink-100, #f3efe7)",
        padding: 3,
        borderRadius: 999,
        gap: 2,
      }}
    >
      {["a", "b", "c", "d", "e"].map((l) => (
        <div
          key={l}
          style={{
            width: px,
            height: px,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: l === "c" ? "#3a2a00" : "#fff",
            fontSize: fs,
            fontWeight: 700,
            background: NUTRI_BG[l],
            opacity: active?.toLowerCase() === l ? 1 : 0.3,
            filter: active?.toLowerCase() === l ? "none" : "saturate(0.3)",
            transform: active?.toLowerCase() === l ? "scale(1.18)" : "none",
            boxShadow:
              active?.toLowerCase() === l
                ? "0 2px 8px rgba(0,0,0,0.15)"
                : "none",
            transition: "all 0.25s",
          }}
        >
          {l.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

/* ── NOVA pill ───────────────────────────────────────────────────────────── */
function NovaPill({ group }: { group: number }) {
  const labels: Record<number, string> = {
    1: "Não processado",
    2: "Ingrediente culinário",
    3: "Processado",
    4: "Ultraprocessado",
  };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 10px 4px 4px",
        borderRadius: 999,
        background: "var(--ink-100, #f3efe7)",
        border: "1px solid var(--ink-200, #e4dfd7)",
        fontSize: 12,
        color: "var(--ink-700, #3d3934)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          background: NOVA_BG[group] || "#a39c93",
          color: NOVA_INK[group] || "#fff",
          display: "grid",
          placeItems: "center",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 700,
          fontSize: 11,
        }}
      >
        {group}
      </span>
      NOVA · {labels[group] || "Desconhecido"}
    </div>
  );
}

export default function ProdutoPage() {
  const params = useParams();
  const router = useRouter();
  const barcode = params.barcode as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await searchByBarcode(barcode);
      if (result) setProduct(result);
      else setError("Produto não encontrado na base de dados.");
    } catch {
      setError("Falha ao carregar os dados do produto.");
    } finally {
      setLoading(false);
    }
  }, [barcode]);

  useEffect(() => {
    if (barcode) searchProduct();
  }, [barcode, searchProduct]);

  if (loading) return <ProductSkeleton />;

  /* ── Error state ─────────────────────────────────────────────────────── */
  if (error || !product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--ink-0, #fdfbf5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            maxWidth: 420,
            width: "100%",
            background: "var(--ink-0, #fdfbf5)",
            border: "1px solid var(--ink-200, #e4dfd7)",
            borderRadius: 20,
            padding: 48,
            textAlign: "center",
          }}
        >
          <AlertCircle
            style={{
              width: 40,
              height: 40,
              color: "#e63e11",
              margin: "0 auto 20px",
            }}
            strokeWidth={1.5}
          />
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 28,
              color: "var(--ink-900, #141312)",
              marginBottom: 10,
            }}
          >
            Produto não encontrado
          </h1>
          <p
            style={{
              color: "var(--ink-600, #595149)",
              fontSize: 14,
              marginBottom: 28,
              lineHeight: 1.55,
            }}
          >
            {error}
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => router.push("/")}
              style={{
                flex: 1,
                padding: "12px 0",
                background: "var(--accent, oklch(52% 0.11 155))",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Nova Busca
            </button>
            <button
              onClick={() => router.back()}
              style={{
                flex: 1,
                padding: "12px 0",
                background: "transparent",
                color: "var(--ink-900, #141312)",
                border: "1px solid var(--ink-200, #e4dfd7)",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Voltar
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const imageUrl = product.image_front_url || product.image_url || null;
  const grade = product.nutrition_grades?.toLowerCase();
  const nova = product.nova_group;
  const gradeDesc = grade ? GRADE_DESC[grade] : null;
  const novaDesc = nova ? NOVA_DESC[nova] : null;

  /* ── Nutrition bars — % of daily reference ─────────────────────────── */
  const dailyRef: Record<string, number> = {
    energy_100g: 2000,
    fat_100g: 70,
    saturated_fat_100g: 20,
    sugars_100g: 90,
    salt_100g: 6,
    fiber_100g: 30,
    proteins_100g: 50,
  };
  const nutriments = product.nutriments || {};
  const nutritionRows = [
    { key: "energy_100g",       label: "Energia",              unit: "kcal" },
    { key: "fat_100g",          label: "Gorduras totais",      unit: "g" },
    { key: "saturated_fat_100g",label: "Gorduras saturadas",   unit: "g" },
    { key: "sugars_100g",       label: "Açúcares",             unit: "g" },
    { key: "salt_100g",         label: "Sódio",                unit: "g" },
    { key: "fiber_100g",        label: "Fibras",               unit: "g" },
    { key: "proteins_100g",     label: "Proteínas",            unit: "g" },
  ];

  const allergenTags = product.allergens_tags || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ink-0, #fdfbf5)",
        color: "var(--ink-900, #141312)",
      }}
    >
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "18px clamp(20px, 5vw, 40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--ink-200, #e4dfd7)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(253,251,245,0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 13,
            color: "var(--ink-700, #3d3934)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} strokeWidth={1.75} />
          Voltar
        </button>
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 11,
            color: "var(--ink-500, #7a7269)",
            letterSpacing: "0.12em",
          }}
        >
          EAN · {product.code}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              border: "1px solid var(--ink-200, #e4dfd7)",
              borderRadius: 8,
              background: "transparent",
              color: "var(--ink-700, #3d3934)",
              cursor: "pointer",
            }}
            title="Salvar"
          >
            <Heart style={{ width: 14, height: 14 }} strokeWidth={1.75} />
          </button>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              border: "1px solid var(--ink-200, #e4dfd7)",
              borderRadius: 8,
              background: "transparent",
              color: "var(--ink-700, #3d3934)",
              cursor: "pointer",
            }}
            title="Compartilhar"
          >
            <Share2 style={{ width: 14, height: 14 }} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* ── Hero: image + headline + Nutri-Score ────────────────────────── */}
      <div
        style={{
          padding: "40px clamp(20px, 5vw, 40px) 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 48,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            background: "var(--ink-50, #f9f6f0)",
            borderRadius: 18,
            aspectRatio: "1/1",
            display: "grid",
            placeItems: "center",
            border: "1px solid var(--ink-200, #e4dfd7)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.product_name || "Produto"}
              fill
              className="object-contain p-10"
              priority
              sizes="(max-width: 768px) 100vw, 500px"
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink-400, #a39c93)",
              }}
            >
              <Beaker style={{ width: 64, height: 64 }} strokeWidth={1} />
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "ui-monospace, monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: 12,
                }}
              >
                Sem imagem
              </span>
            </div>
          )}
        </motion.div>

        {/* Right column — headline + score cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {/* Brand eyebrow */}
          <div
            style={{
              fontSize: 12,
              color: "var(--ink-500, #7a7269)",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {product.brands || "Marca desconhecida"}
          </div>

          {/* Product name */}
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.08,
              color: "var(--ink-900, #141312)",
              marginBottom: 28,
            }}
          >
            {product.product_name || "Produto sem nome"}
          </h1>

          {/* ── Nutri-Score hero metric ─────────────────────────────────── */}
          {grade && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: 24,
                background: "var(--ink-50, #f9f6f0)",
                border: "1px solid var(--ink-200, #e4dfd7)",
                borderRadius: 16,
                marginBottom: 16,
              }}
            >
              <NutriLetter grade={grade} size={92} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ink-500, #7a7269)",
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  Nutri‑Score
                </div>
                <div
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 26,
                    letterSpacing: "-0.01em",
                    color: "var(--ink-900, #141312)",
                    lineHeight: 1.1,
                    marginBottom: 12,
                  }}
                >
                  {gradeDesc || `Nota ${grade.toUpperCase()}`}
                </div>
                <NutriScale active={grade} size="sm" />
              </div>
            </motion.div>
          )}

          {/* ── NOVA row ─────────────────────────────────────────────────── */}
          {nova && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                padding: 20,
                border: "1px solid var(--ink-200, #e4dfd7)",
                borderRadius: 14,
                marginBottom: 16,
                display: "flex",
                gap: 18,
                alignItems: "center",
              }}
            >
              <NovaPill group={nova} />
              {novaDesc && (
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--ink-600, #595149)",
                    lineHeight: 1.55,
                    flex: 1,
                  }}
                >
                  {novaDesc}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Allergens ────────────────────────────────────────────────── */}
          <AnimatePresence>
            {allergenTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                style={{
                  padding: 18,
                  borderRadius: 14,
                  background: "#fef3c7",
                  border: "1px solid #fcd34d",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <AlertTriangle
                  style={{ width: 20, height: 20, color: "#b45309", flexShrink: 0, marginTop: 1 }}
                  strokeWidth={1.75}
                />
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#b45309",
                      marginBottom: 6,
                    }}
                  >
                    Contém alérgenos
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {allergenTags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 12,
                          padding: "3px 10px",
                          background: "rgba(255,255,255,0.7)",
                          border: "1px solid #fde68a",
                          borderRadius: 999,
                          color: "#78350f",
                        }}
                      >
                        {tag.replace(/en:|pt:/g, "")}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Nutrition composition section ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          borderTop: "1px solid var(--ink-200, #e4dfd7)",
          padding: "32px clamp(20px, 5vw, 40px) 60px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 24,
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(22px, 3vw, 30px)",
              letterSpacing: "-0.01em",
              color: "var(--ink-900, #141312)",
            }}
          >
            Composição nutricional
          </h2>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-500, #7a7269)",
              fontWeight: 500,
            }}
          >
            por 100g · %VD de referência
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0 48px",
          }}
        >
          {nutritionRows.map((row) => {
            const raw = nutriments[row.key as keyof typeof nutriments];
            const v = raw != null ? Number(raw) : null;
            if (v == null) return null;
            const ref = dailyRef[row.key] || 100;
            const pct = Math.min(100, Math.round((v / ref) * 100));
            const isHigh =
              pct > 40 &&
              ["fat_100g", "saturated_fat_100g", "sugars_100g", "salt_100g"].includes(row.key);
            const isGood = ["fiber_100g", "proteins_100g"].includes(row.key);
            const barColor = isHigh
              ? "#e63e11"
              : isGood
              ? "var(--accent, oklch(52% 0.11 155))"
              : "var(--ink-500, #7a7269)";

            return (
              <div
                key={row.key}
                style={{
                  padding: "14px 0",
                  borderBottom: "1px solid var(--ink-200, #e4dfd7)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 14, color: "var(--ink-800, #26231f)" }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: 18,
                      color: "var(--ink-900, #141312)",
                    }}
                  >
                    {v}
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--ink-500, #7a7269)",
                        marginLeft: 3,
                        fontFamily: "ui-monospace, monospace",
                      }}
                    >
                      {row.unit}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: "var(--ink-100, #f3efe7)",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: barColor,
                      borderRadius: 999,
                      transition: "width 0.6s",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--ink-500, #7a7269)",
                    marginTop: 4,
                    fontFamily: "ui-monospace, monospace",
                    letterSpacing: "0.04em",
                  }}
                >
                  {pct}% VD
                </div>
              </div>
            );
          })}
        </div>

        {/* Ingredients */}
        {product.ingredients_text && (
          <div
            style={{
              marginTop: 40,
              padding: 24,
              background: "var(--ink-50, #f9f6f0)",
              border: "1px solid var(--ink-200, #e4dfd7)",
              borderRadius: 14,
            }}
          >
            <h3
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 20,
                color: "var(--ink-900, #141312)",
                marginBottom: 14,
              }}
            >
              Lista de Ingredientes
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "var(--ink-600, #595149)",
                lineHeight: 1.65,
              }}
            >
              {product.ingredients_text}
            </p>
          </div>
        )}
      </motion.div>

      {/* ── Footer attribution ─────────────────────────────────────────── */}
      <div
        style={{
          padding: "24px clamp(20px, 5vw, 40px)",
          background: "var(--ink-50, #f9f6f0)",
          borderTop: "1px solid var(--ink-200, #e4dfd7)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            fontSize: 12,
            color: "var(--ink-500, #7a7269)",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.04em",
            lineHeight: 1.6,
          }}
        >
          Dados fornecidos pela comunidade Open Food Facts sob licença ODbL.
          {product.countries && ` · Região: ${product.countries}`}
        </div>
      </div>
    </div>
  );
}
